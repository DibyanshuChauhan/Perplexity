# 🌐 Perplexity AI — Full-Stack Intelligent Assistant

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/LangChain-Agentic_AI-00A67E?style=for-the-badge" alt="LangChain" />
  <img src="https://img.shields.io/badge/Mistral_AI-LLM-FF7000?style=for-the-badge" alt="Mistral AI" />
  <img src="https://img.shields.io/badge/Tavily-Live_Search-4F46E5?style=for-the-badge" alt="Tavily AI" />
</p>

---

## 📌 Executive Summary

**Perplexity AI** is a production-ready, full-stack AI research and task automation platform inspired by Perplexity.ai. Going far beyond traditional chatbots, this platform combines **agentic LLM reasoning (Mistral AI / Google Gemini)**, **real-time live web indexing (Tavily AI)**, and **autonomous action execution (Google OAuth 2.0 + Nodemailer)** into an intuitive, responsive user interface.

Whether summarizing real-time events from across the globe or composing and delivering styled research briefings straight to an email inbox, Perplexity AI bridges the gap between static LLMs and real-world utility.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Repository Structure](#-repository-structure)
- [Tech Stack Overview](#-tech-stack-overview)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Environment Configuration](#-environment-configuration)
- [AI Engine & Model Selection](#-ai-engine--model-selection)
- [Google OAuth & Email Setup](#-google-oauth--email-setup)
- [API Route Reference](#-api-route-reference)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

### 🧠 Agentic Reasoning & Live Search
- **Live Internet Access:** Integrates Tavily AI as a first-class LangChain tool. The agent automatically decides when up-to-date web research is needed and retrieves relevant context.
- **Model Flexibility:** Runs on **Mistral AI** (`open-mistral-7b`) with graceful fallback to **Google Gemini** (`gemini-2.5-flash-lite`).
- **Automated Title Generation:** Dynamically summarizes chat context into concise 2–4 word conversation headings upon first query.

### ✉️ Autonomous Email Dispatch
- **Google OAuth 2.0 Integration:** Sends verified emails via Gmail on behalf of the user using refresh tokens and Nodemailer.
- **Rich HTML Email Templates:** Compiles markdown data directly into responsive, beautifully-styled HTML briefings with headings, tables, blockquotes, and callouts.
- **In-App Email Action Cards:** Renders specialized email status cards directly in the conversation timeline displaying recipient, subject, and delivery state.

### 🔐 Security & Identity
- **JWT & HTTP-Only Cookie Authentication:** Secure token exchange preventing XSS and CSRF exposure.
- **Password Entropy Matrix:** Real-time client-side password strength validation requiring mixed casing, special characters, and minimum length.
- **Email Verification Flow:** Sends timed verification tokens to authenticate user email addresses prior to session initialization.

### 🎨 User Experience & Design
- **Modern Minimalist UI:** Built using Tailwind CSS with glassmorphism, responsive drawer navigation, and dark mode aesthetics.
- **Realistic Typing & Thinking States:** Smooth character-by-character typing effects and non-blocking thinking indicators.
- **Global Toast Notification System:** Real-time feedback for asynchronous tasks, network status, and operational dispatches.

---

## 🏗 System Architecture

```text
 ┌─────────────────────────────────────────────────────────────────┐
 │                       React 19 Frontend                         │
 │   (Vite • Redux Toolkit • Tailwind CSS • Framer Motion)         │
 └───────────────────────────────┬─────────────────────────────────┘
                                 │ HTTP / JSON API
                                 ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                      Express.js Backend                         │
 │     (Node.js • JWT Auth • Cookies • Mongoose ODM)               │
 └───────┬───────────────────────┬─────────────────────────┬───────┘
         │                       │                         │
         ▼                       ▼                         ▼
 ┌───────────────┐       ┌───────────────┐         ┌───────────────┐
 │ MongoDB Atlas │       │   LangChain   │         │  Nodemailer   │
 │ (Users/Chats/ │       │  Agent Engine │         │  Google OAuth │
 │   Messages)   │       └───────┬───────┘         └───────┬───────┘
 └───────────────┘               │                         │
                  ┌──────────────┴──────────────┐          ▼
                  ▼                             ▼    Destination
          ┌───────────────┐             ┌───────────────┐   Inbox
          │  Mistral AI   │             │   Tavily AI   │
          │(open-mistral) │             │ (Web Search)  │
          └───────────────┘             └───────────────┘
```

---

## 📂 Repository Structure

```text
Perplexity/
│
├── Backend/                      # Node.js + Express.js API Server
│   ├── src/
│   │   ├── config/               # Database connection (db.js)
│   │   ├── controllers/          # Business logic (auth, chat)
│   │   ├── middlewares/          # JWT auth guards (auth.middleware.js)
│   │   ├── models/               # Mongoose schemas (user, chat, message)
│   │   ├── routes/               # Express endpoints (auth, chat)
│   │   ├── services/             # AI (LangChain), internet (Tavily), email
│   │   ├── validators/           # Input validation rules (express-validator)
│   │   └── app.js                # Express app setup & middleware
│   ├── .env                      # Backend environment variables (git-ignored)
│   ├── package.json              # Backend dependencies & scripts
│   ├── server.js                 # HTTP listener & database entry point
│   └── README.md                 # Backend-specific documentation
│
├── FrontEnd/                     # React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── app/                  # App shell, routing & Redux store config
│   │   ├── context/              # Toast & global context providers
│   │   ├── features/
│   │   │   ├── auth/             # Login, Register, Resend Verification, Slice
│   │   │   └── chat/             # Dashboard, Sidebar, Message Cards, Slice
│   │   └── main.jsx              # React DOM initialization
│   ├── index.html                # Vite HTML entry point
│   ├── package.json              # Frontend dependencies & scripts
│   ├── vite.config.js            # Vite build configuration
│   └── README.md                 # Frontend-specific documentation
│
└── README.md                     # Root project documentation (this file)
```

---

## 🛠 Tech Stack Overview

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Redux Toolkit, React Router DOM, Tailwind CSS, Framer Motion, React Markdown, Axios |
| **Backend** | Node.js (v20+ / v22+), Express.js (v5), Mongoose ODM, MongoDB Atlas, bcryptjs, jsonwebtoken, cookie-parser |
| **AI & Orchestration** | LangChain, `@langchain/mistralai`, `@langchain/google-genai`, Zod schema validation |
| **External APIs** | Mistral AI API, Google Gemini API, Tavily Search API, Google Cloud OAuth 2.0, Gmail REST API |
| **Email Transport** | Nodemailer with OAuth 2.0 token refreshment, Marked (Markdown to HTML parser) |

---

## 📋 Prerequisites

Before setting up the project, make sure you have:

- **Node.js**: v18.0.0 or higher (v20+ recommended). Check with `node -v`.
- **npm** or **yarn**: npm v9+ or yarn v1.22+. Check with `npm -v`.
- **MongoDB**: A free MongoDB Atlas cluster URI or a local MongoDB instance.
- **Mistral AI Account**: API key from [console.mistral.ai](https://console.mistral.ai/).
- **Tavily AI Account**: Free API key from [tavily.com](https://tavily.com/).
- **Google Cloud Account**: Required for Gmail OAuth 2.0 integration.

---

## 🚀 Quick Start Guide

### 1. Clone Repository

```bash
git clone https://github.com/DibyanshuChauhan/Perplexity.git
cd Perplexity
```

### 2. Backend Setup

```bash
# Navigate to the Backend folder
cd Backend

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env   # Or create .env manually (see configuration below)

# Start backend in development mode (with nodemon)
npm run dev
```

The backend server will start on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to the FrontEnd folder
cd FrontEnd

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:5173
```

---

## 🔑 Environment Configuration

Create a file named `.env` in the `Backend/` directory with the following variables:

```env
# ==========================================
# Server & Database Configuration
# ==========================================
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Perplexity?retryWrites=true&w=majority

# ==========================================
# Security & Authentication
# ==========================================
JWT_SECRET=your_super_secret_jwt_random_string_here

# ==========================================
# AI Model Configuration
# ==========================================
# Recommended Mistral model for free-tier: open-mistral-7b
MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_MODEL=open-mistral-7b

# Optional fallback or secondary model
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite

# ==========================================
# Web Search Service
# ==========================================
TAVILY_API_KEY=tvly-your_tavily_api_key_here

# ==========================================
# Google OAuth 2.0 (Gmail Integration)
# ==========================================
GOOGLE_USER=your_verified_gmail_address@gmail.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_google_client_secret
GOOGLE_REFRESH_TOKEN=1//your_google_refresh_token_here
```

### Environment Variables Glossary

| Variable | Required | Description |
| :--- | :---: | :--- |
| `MONGO_URI` | **Yes** | Connection URI to your MongoDB Atlas cluster or local database. |
| `PORT` | No | Port on which Express listens (defaults to `3000`). |
| `JWT_SECRET` | **Yes** | Cryptographic secret used to sign and verify session tokens. |
| `MISTRAL_API_KEY` | **Yes** | API key used for LangChain AI reasoning. |
| `MISTRAL_MODEL` | No | Mistral model identifier. Use `open-mistral-7b` for free-tier reliability. |
| `GEMINI_API_KEY` | No | API key for Google Gemini model fallback. |
| `TAVILY_API_KEY` | **Yes** | API key for Tavily live internet web search. |
| `GOOGLE_USER` | **Yes** | Gmail account utilized to dispatch automated briefing emails. |
| `GOOGLE_CLIENT_ID` | **Yes** | Client ID from Google Cloud Console OAuth 2.0 credentials. |
| `GOOGLE_CLIENT_SECRET` | **Yes** | Client Secret from Google Cloud Console. |
| `GOOGLE_REFRESH_TOKEN` | **Yes** | OAuth refresh token providing continuous email sending permissions. |

---

## 🤖 AI Engine & Model Selection

### Mistral Free Tier vs Paid Tier
- **Why `open-mistral-7b`?** Mistral's endpoint for `mistral-small-latest` restricts free-tier keys to 0 requests/min (resulting in HTTP `429 Rate Limit Exceeded`). Setting `MISTRAL_MODEL=open-mistral-7b` (or `ministral-8b-latest` / `open-mistral-nemo`) provides full tool-calling capabilities on the free tier with active RPM allowances.
- **Fail-Safe Fallback:** The application architecture includes an automated fallback mechanism: if the primary provider encounters network issues or rate limits, the request automatically falls back to Google Gemini (`gemini-2.5-flash-lite`).

---

## 📧 Google OAuth & Email Setup

To enable the autonomous email sending features:

1. **Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project and enable the **Gmail API** under *APIs & Services*.
2. **Configure OAuth Consent Screen:**
   - Choose **External** user type.
   - Enter application name and contact email.
   - Under *Test Users*, add your sender Gmail address.
3. **Generate OAuth Credentials:**
   - Navigate to *Credentials* → *Create Credentials* → *OAuth client ID*.
   - Application Type: **Web Application**.
   - Add `https://developers.google.com/oauthplayground` to **Authorized redirect URIs**.
   - Copy your `Client ID` and `Client Secret`.
4. **Acquire Refresh Token via OAuth Playground:**
   - Visit [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
   - Click the gear icon (⚙️) on the top right:
     - Check **"Use your own OAuth credentials"**.
     - Paste your `Client ID` and `Client Secret`.
   - In Step 1, select: `https://mail.google.com/` (or `Gmail API v1` scopes).
   - Click **Authorize APIs** and log in with your sender Gmail account.
   - In Step 2, click **Exchange authorization code for tokens**.
   - Copy the `Refresh token` into `GOOGLE_REFRESH_TOKEN` in your `.env`.

---

## 🌐 API Route Reference

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate and issue HTTP-only cookie | No |
| `POST` | `/api/auth/logout` | Clear session cookie and invalidate token | No |
| `GET` | `/api/auth/get-me` | Retrieve profile of the current authenticated user | **Yes** |
| `GET` | `/api/auth/verify-email` | Validate email address via token | No |
| `POST` | `/api/auth/resend-verification` | Request a new email verification link | No |

### Chat Routes (`/api/chats`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/chats/message` | Send message, trigger AI tool agent, get response | **Yes** |
| `GET` | `/api/chats` | List all conversation threads for authenticated user | **Yes** |
| `GET` | `/api/chats/:chatId/messages` | Fetch complete message history for a specific chat | **Yes** |
| `DELETE` | `/api/chats/delete/:chatId` | Permanently remove a chat and its message history | **Yes** |

---

## ❓ Troubleshooting & FAQ

<details>
<summary><b>1. HTTP 429: "The AI service rate limit has been exceeded"</b></summary>

- **Reason:** You may be using `mistral-small-latest` on a free-tier key, which has a 0 RPM quota on Mistral.
- **Fix:** In your `Backend/.env`, add:
  ```env
  MISTRAL_MODEL=open-mistral-7b
  ```
  Restart the backend server. `open-mistral-7b` is free-tier enabled and supports full tool-calling.
</details>

<details>
<summary><b>2. "Unauthorized. Please log in" when sending messages</b></summary>

- **Reason:** The browser does not have a valid JWT cookie, or CORS is rejecting credentials.
- **Fix:** Ensure you register and sign in through the frontend UI at `/login`. Both Vite and Express are configured with `withCredentials: true` to handle cookies automatically.
</details>

<details>
<summary><b>3. Nodemailer / Gmail "Invalid Grant" or "Token Expired"</b></summary>

- **Reason:** The OAuth refresh token has expired, or the Google Cloud project is in "Testing" mode (where refresh tokens expire after 7 days if the test user is removed).
- **Fix:** Re-generate the refresh token via OAuth Playground using the steps outlined in [Google OAuth Setup](#-google-oauth--email-setup). In Google Cloud Console, ensure your email address is listed under *Test Users*.
</details>

<details>
<summary><b>4. Vite Frontend cannot reach Backend API</b></summary>

- **Reason:** Backend is not running or running on an unexpected port.
- **Fix:** Verify backend is active on `http://localhost:3000`. In `FrontEnd/.env`, ensure `VITE_API_URL=http://localhost:3000` is present.
</details>

---

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push Branch to Your Fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** with a detailed explanation of your changes.

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute this software in personal and commercial applications.

---

<div align="center">
  <sub>Built with ❤️ by Dibyanshu Chauhan • Inspired by the future of AI Search</sub>
</div>
