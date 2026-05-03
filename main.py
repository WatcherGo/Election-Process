import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import firebase_admin
from firebase_admin import firestore

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    # Content Security Policy (CSP)
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; "
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; "
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; "
        "img-src 'self' data: https://*; "
        "connect-src 'self' https://*; "
    )
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
    return response

if not firebase_admin._apps:
    firebase_admin.initialize_app()
db = firestore.client()

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY", "dummy_key_for_build"))

ELECTION_DATA = {
    "USA": {
        "TX": {"deadline": "Oct 5, 2026", "link": "votetexas.gov"},
        "CA": {"deadline": "Oct 19, 2026", "link": "registertovote.ca.gov"},
        "FL": {"deadline": "Oct 5, 2026", "link": "registertovoteflorida.gov"}
    },
    "INDIA": {
        "TN": {"deadline": "Approx Mar 2026", "link": "voters.eci.gov.in"},
        "KL": {"deadline": "Approx Mar 2026", "link": "voters.eci.gov.in"},
        "WB": {"deadline": "Approx Mar 2026", "link": "voters.eci.gov.in"}
    }
}

def get_election_info(country: str, region: str) -> dict:
    """Get 2026 voting deadlines and links for a country and region/state."""
    c_data = ELECTION_DATA.get(country.upper())
    if not c_data: return {"error": "Country not found"}
    return c_data.get(region.upper(), {"error": "Region not found"})

def save_progress(user_id: str, node: str) -> str:
    """Save user progress to the next node (Register, Research, Vote)."""
    db.collection("users").document(user_id).set({"node": node}, merge=True)
    return f"Progress saved: {node}"

sys_prompt = "You are VoteBot. Guide users globally (USA/India) through 3 steps: Register -> Research -> Vote. 1. Ask country/state first. 2. Once they provide state, call save_progress(user_id, 'Research') and use get_election_info for facts. 3. Help them vote. Keep responses under 3 sentences."
model = genai.GenerativeModel("gemini-3-flash-preview", tools=[get_election_info, save_progress], system_instruction=sys_prompt)

class ChatRequest(BaseModel):
    user_id: str
    message: str
    state: str = ""
    country: str = ""

@app.post("/chat")
async def chat(req: ChatRequest):
    user_ref = db.collection("users").document(req.user_id)
    user_doc = user_ref.get()
    current_node = user_doc.to_dict().get("node", "Register") if user_doc.exists else "Register"
    
    chat_session = model.start_chat(enable_automatic_function_calling=True)
    msg = f"User: {req.message}\nCountry: {req.country}\nRegion: {req.state}\nNode: {current_node}\nID: {req.user_id}"
    response = chat_session.send_message(msg)
    
    updated_doc = user_ref.get()
    next_node = updated_doc.to_dict().get("node", current_node) if updated_doc.exists else current_node
    
    options = []
    if not req.country:
        options = ["USA", "India"]
    elif req.country and not req.state:
        if req.country.upper() == "USA":
            options = ["TX", "CA", "FL"]
        elif req.country.upper() == "INDIA":
            options = ["TN", "KL", "WB"]

    return {
        "reply": response.text if response.text else "Please select your region to continue.",
        "next_node": next_node,
        "options": options
    }

@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
