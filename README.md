# 🗳️ VoteBot - Global 2026 Election Assistant
> **A High-Performance, AI-Driven Voting Guide for a Global Audience.**
> *Built for the PromptWars 2026 Competition.*

[![Google Cloud Run](https://img.shields.io/badge/Hosted_on-Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Gemini 3.1](https://img.shields.io/badge/Powered_by-Gemini_3_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

## 📂 Submission Details

### 🏢 Chosen Vertical
**Civic Technology / Election Assistance**  
VoteBot is designed to bridge the information gap in democratic participation by providing localized, real-time voting guidance through an intuitive AI interface.

### 💡 Approach and Logic
The project follows a **"State-Machine Chat"** approach:
1.  **Context Injection:** On every user message, the backend injects the user's current session state (Location, Country, Progress Node) into the Gemini 3 Flash system prompt.
2.  **Function Calling (Tools):** Instead of relying on LLM training data (which may be stale), VoteBot uses **Tool Calling** (`get_election_info`) to fetch verified 2026 deadlines and registration links from a curated backend database.
3.  **State Persistence:** User progress is stored in **Firestore**, allowing for a persistent "Voting Journey" even across sessions.

### ⚙️ How the Solution Works
1.  **User Onboarding:** Upon first contact, VoteBot triggers an interactive dropdown to capture the user's Country and State.
2.  **Guided Workflow:** The bot progresses through three distinct nodes: **Register** ➡️ **Research** ➡️ **Vote**. 
3.  **Real-time Logic:** When a user asks about deadlines, the LLM calls the internal Python logic to retrieve the correct info for the user's specific region.
4.  **Security & Scaling:** The app is containerized via **Docker** and deployed on **Google Cloud Run**, ensuring it can scale to zero when not in use and handle thousands of concurrent users instantly.

### 📌 Assumptions Made
- **2026 Focus:** All data provided by tools is specifically curated for the 2026 election cycle.
- **Language:** The current implementation assumes English as the primary interface language.
- **Regions:** While the engine is global, data is currently pre-populated for major states in the **USA** and **India** as a proof of concept.

---

## 🚀 Key Features

- **Smart Dropdowns:** In-chat interactive menus for friction-less selection.
- **Visual Timeline:** Persistent progress tracking at the top of the UI.
- **Celebratory UI:** Integrated `canvas-confetti` celebrations upon reaching milestones.
- **Security First:** CSP headers, XSS protection, and secure middleware.

---

## 🏗️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Cloud Hosting** | **Google Cloud Run** |
| **AI Brain** | **Gemini 3 Flash Preview** |
| **Database** | **Firestore** |
| **Pipeline** | **Cloud Build** |
| **Backend** | **FastAPI** |
| **Frontend** | **Vanilla JS / Tailwind CSS** |

---

## 🔧 Installation & Deployment

### Local Development
```bash
pip install -r requirements.txt
gcloud auth application-default login
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Run Tests
```bash
pytest test_main.py
```

---

## 📝 License
Distributed under the Apache 2.0 License.

**Built with ❤️ for PromptWars 2026.**