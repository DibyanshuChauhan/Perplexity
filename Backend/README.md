# ⚙️ Perplexity AI — Backend Service Engine

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/LangChain-AI-00A67E?style=for-the-badge" alt="LangChain" />
  <img src="https://img.shields.io/badge/Mistral_AI-open--mistral--7b-FF7000?style=for-the-badge" alt="Mistral AI" />
  <img src="https://img.shields.io/badge/Tavily-Search_Engine-3B82F6?style=for-the-badge" alt="Tavily AI" />
  <img src="https://img.shields.io/badge/Nodemailer-OAuth_2.0-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer" />
</p>

---

## 📌 Overview

The **Perplexity Backend** is an asynchronous Express.js API service designed around an agentic workflow. Rather than functioning as a standard request-response LLM wrapper, the service integrates **LangChain tool agents** that can autonomously search the live web via Tavily AI and compile rich HTML research briefings to dispatch via Gmail OAuth 2.0.

---

## 📑 Table of Contents

- [Core Architectural Highlights](#-core-architectural-highlights)
- [Folder Structure](#-folder-structure)
- [AI Agent & Tool Architecture](#-ai-agent--tool-architecture)
- [REST API Reference](#-rest-api-reference)
  - [Authentication API](#1-authentication-api-apiauth)
  - [Chat & Message API](#2-chat--message-api-apichats)
- [Database Schema Design](#-database-schema-design)
- [Environment Configuration](#-environment-configuration)
- [Installation & Running](#-installation--running)
- [Google OAuth Refresh Token Guide](#-google-oauth-refresh-token-guide)
- [Error Handling & Rate Limits](#-error-handling--rate-limits)

---

## 🏗 Core Architectural Highlights

1. **Express 5.x & ESM:** Built with modern ECMAScript module imports (`"type": "module"`) and native promise-based handlers.
2. **LangChain Tool Agents:** Uses LangChain's `createAgent` with function-calling schemas validated via **Zod**.
3. **Dual Model Redundancy:** Employs **Mistral AI** (`open-mistral-7b`) as the primary reasoning engine, with automated fallback to **Google Gemini** (`gemini-2.5-flash-lite`).
4. **HTML Email Formatter:** Converts raw LLM markdown into an inline CSS-styled, responsive email document via **Marked**.
5. **Stateful Session Storage:** Manages threads in **MongoDB** (`User`, `Chat`, and `Message` models) with automated title synthesis.

---

## 📂 Folder Structure

```text
Backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Mongoose database connection initialization
│   ├── controllers/
│   │   ├── auth.controller.js    # Registration, login, verify, logout, getMe
│   │   └── chat.controller.js    # Chat creation, message handling, history queries
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT cookie verification middleware
│   ├── models/
│   │   ├── chat.model.js         # Chat session schema (title, user, chatType)
│   │   ├── message.model.js      # Message schema (role, content, emailDetails)
│   │   └── user.model.js         # User schema (username, email, passwordHash, verified)
│   ├── routes/
│   │   ├── auth.routes.js        # Auth endpoint definitions
│   │   └── chat.routes.js        # Chat & message endpoint definitions
│   ├── services/
│   │   ├── ai.service.js         # LangChain agent, tools binding, title generator
│   │   ├── internet.service.js   # Tavily web search integration
│   │   └── mail.service.js       # Nodemailer transport & OAuth 2.0 token handler
│   ├── validators/
│   │   └── auth.validator.js     # express-validator request validation schemas
│   └── app.js                    # Express app configuration, CORS, cookie parser
│
├── .env                          # Local environment variables (do not commit)
├── package.json                  # Dependencies & scripts
└── server.js                     # HTTP entry point (port listening & DB sync)
```

---

## 🤖 AI Agent & Tool Architecture

The agent is instantiated in `src/services/ai.service.js` with access to two dedicated tools:

```text
                             User Prompt
                                 │
                                 ▼
                     LangChain createAgent
                                 │
             ┌───────────────────┴───────────────────┐
             ▼                                       ▼
    searchInternet Tool                       sendEmail Tool
             │                                       │
     Tavily Search API                    Compile Markdown to HTML
             │                                       │
  Top 5 Real-Time Results                 Nodemailer + Google OAuth
             │                                       │
             └───────────────────┬───────────────────┘
                                 ▼
                    Final Structured AI Response
```

### 1. `searchInternet` Tool
- **Description:** Queries the live web using Tavily Search API.
- **Trigger:** When users ask about current events, scores, breaking news, or topics beyond training cutoffs.
- **Parameters:** `{ query: string }`.

### 2. `sendEmail` Tool
- **Description:** Generates an executive briefing in Markdown, formats it into responsive inline-CSS HTML, and sends it via Gmail.
- **Trigger:** When users ask to email summaries, send messages, or forward research.
- **Parameters:** `{ to: string, subject: string, body: string }`.

---

## 🌐 REST API Reference

All protected endpoints require an authenticated JWT session (sent via HTTP-only cookie).

### 1. Authentication API (`/api/auth`)

| Endpoint | Method | Access | Body Payload | Description |
| :--- | :---: | :---: | :--- | :--- |
| `/api/auth/register` | `POST` | Public | `{ username, email, password }` | Creates user and dispatches email verification token. |
| `/api/auth/login` | `POST` | Public | `{ email, password }` | Authenticates user and issues HTTP-only `token` cookie. |
| `/api/auth/get-me` | `GET` | Authenticated | None | Returns current user profile without password. |
| `/api/auth/verify-email` | `GET` | Public | Query: `?token=<token>` | Verifies email and activates account. |
| `/api/auth/resend-verification` | `POST` | Public | `{ email }` | Generates and sends a new verification link. |
| `/api/auth/logout` | `POST` | Public | None | Clears authentication cookie. |

### 2. Chat & Message API (`/api/chats`)

| Endpoint | Method | Access | Body / Query | Description |
| :--- | :---: | :---: | :--- | :--- |
| `/api/chats/message` | `POST` | Authenticated | `{ message, chat?, chatType? }` | Primary AI interaction endpoint. Processes prompt through LangChain agent. |
| `/api/chats` | `GET` | Authenticated | None | Returns all conversation sessions for the user. |
| `/api/chats/:chatId/messages` | `GET` | Authenticated | Param: `chatId` | Returns chronologically ordered message history. |
| `/api/chats/delete/:chatId` | `DELETE` | Authenticated | Param: `chatId` | Permanently deletes a chat session and its messages. |

---

## 🗄 Database Schema Design

### User Model (`users`)
```javascript
{
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hash
  verified: { type: Boolean, default: false }
}
```

### Chat Model (`chats`)
```javascript
{
  user:     { type: ObjectId, ref: 'User', required: true },
  title:    { type: String, required: true },
  chatType: { type: String, enum: ['search', 'email'], default: 'search' }
}
```

### Message Model (`messages`)
```javascript
{
  chat:         { type: ObjectId, ref: 'Chat', required: true },
  role:         { type: String, enum: ['user', 'ai', 'email'], required: true },
  content:      { type: String, required: true },
  emailDetails: {
    to:      String,
    subject: String,
    status:  { type: String, enum: ['sent', 'failed'] }
  }
}
```

---

## 🔑 Environment Configuration

Create a `.env` file in the `Backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/Perplexity

# Authentication
JWT_SECRET=your_jwt_secret_key_here

# AI Model Configuration
MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_MODEL=open-mistral-7b

# Fallback AI Model
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite

# Search Service
TAVILY_API_KEY=tvly-your_tavily_key_here

# Google OAuth (Nodemailer Email Service)
GOOGLE_USER=your_verified_gmail@gmail.com
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=1//your_refresh_token
```

---

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
*Uses `nodemon server.js` to automatically reload on code changes.*

### 3. Run in Production Mode
```bash
npm start
```

---

## 📧 Google OAuth Refresh Token Guide

To enable automated email delivery:

1. Visit [Google Cloud Console](https://console.cloud.google.com/) and enable the **Gmail API**.
2. Create an **OAuth 2.0 Client ID** with `https://developers.google.com/oauthplayground` in **Authorized redirect URIs**.
3. Go to [Google Developers OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).
4. Click the gear icon (⚙️) on the top right, check **"Use your own OAuth credentials"**, and input your `Client ID` & `Client Secret`.
5. Select `https://mail.google.com/` scope, click **Authorize APIs**, and accept permissions with your sender Gmail account.
6. Click **Exchange authorization code for tokens** and copy the resulting `Refresh token` into `GOOGLE_REFRESH_TOKEN`.

---

## ⚠️ Error Handling & Rate Limits

- **Rate Limits (`429 Too Many Requests`):** If using Mistral's free tier, always use `MISTRAL_MODEL=open-mistral-7b`. Avoid `mistral-small-latest` on free tier keys as Mistral enforces a 0 request/min restriction on that model.
- **Detailed Error Reporting:** The controller checks specific error statuses from upstream AI providers and returns informative JSON responses rather than generic catch-all errors.