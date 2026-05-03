# 🗳️ VoteBot - Global 2026 Election Assistant
> **A High-Performance, AI-Driven Voting Guide for a Global Audience.**
> *Built for the PromptWars Competition.*

[![Google Cloud Run](https://img.shields.io/badge/Hosted_on-Google_Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Gemini 3.1](https://img.shields.io/badge/Powered_by-Gemini_3_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

---

## 🌟 Overview

**VoteBot** is a production-grade, serverless web application designed to simplify the complex world of electoral participation. Unlike static information portals, VoteBot provides a **dynamic, interactive journey** through the three critical phases of democracy:

1.  **Register:** Seamlessly identify deadlines and requirements based on your specific region.
2.  **Research:** Access verified, non-hallucinated voting information.
3.  **Vote:** Finalize your plan with clear instructions.

## 🚀 Key Features

### 🌍 Global-First Architecture
VoteBot isn't just for one country. It features a scalable data engine currently supporting:
- **United States:** Full state-level data (TX, CA, FL).
- **India:** Specialized support for 2026 state-bound regions like Tamil Nadu, Kerala, and West Bengal.

### ⚡ Interactive Experience
- **Smart Dropdowns:** The bot dynamically generates selection menus in-chat, reducing friction and ensuring accurate data collection.
- **Visual Timeline:** A real-time progress tracker at the top of the screen keeps users oriented.
- **Celebratory UI:** Integrated `canvas-confetti` celebrations upon reaching the final voting milestone!

### 🛡️ PromptWars Quality Gates
- **Security:** Zero client-side API exposure. All LLM and Database calls are proxied through a secure FastAPI backend using Application Default Credentials (ADC).
- **Efficiency:** Optimized Docker container (Python 3.11-slim) with a sub-second cold start on Google Cloud Run.
- **Accessibility:** Semantic HTML5, FontAwesome icons, and high-contrast Tailwind CSS styling.

---

## 🏗️ Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Cloud Hosting** | **Google Cloud Run** | Serverless container orchestration. |
| **AI Brain** | **Gemini 3 Flash Preview** | Context-aware logic & Tool Calling. |
| **Database** | **Firestore** | Persistent session tracking & State management. |
| **Pipeline** | **Cloud Build** | Automated CI/CD & Image Registry. |
| **Backend** | **FastAPI** | Async Python API serving static & dynamic content. |
| **Frontend** | **Vanilla JS / Tailwind** | Ultra-lightweight, responsive user interface. |

---

## 🔧 Installation & Deployment

### Local Development
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Authenticate Google Cloud
gcloud auth application-default login

# 3. Start the engine
uvicorn main:app --host 0.0.0.0 --port 8080
```

### Cloud Deployment
```bash
# Build and Push
gcloud builds submit --tag gcr.io/[PROJECT_ID]/votebot

# Deploy to Cloud Run
gcloud run deploy votebot \
  --image gcr.io/[PROJECT_ID]/votebot \
  --set-env-vars="GOOGLE_API_KEY=[YOUR_KEY]"
```

---

## 📝 License
Distributed under the Apache 2.0 License. See `LICENSE` for more information.

**Built with ❤️ for PromptWars 2026.**