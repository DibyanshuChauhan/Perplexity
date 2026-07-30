<div align="center">

# 🚀 Perplexity Backend

### Intelligent AI Backend powered by LangChain, Mistral AI, Tavily Search & Express.js

<p align="center">
Robust backend powering a Perplexity-inspired AI assistant with authentication, internet-enabled AI, email integration, and scalable REST APIs.
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-AI-00A67E?style=for-the-badge)
![Mistral AI](https://img.shields.io/badge/Mistral-AI-FF7000?style=for-the-badge)
![Tavily](https://img.shields.io/badge/Tavily-Web_Search-3B82F6?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

---

**Modern • Secure • Scalable • AI Powered**

</div>

---

# 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [AI Workflow](#-ai-workflow)
- [Email Service](#-email-service)
- [REST APIs](#-rest-apis)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Scripts](#-scripts)
- [Security](#-security)
- [Future Improvements](#-future-improvements)

---

# 📌 Overview

Perplexity Backend is a modern **Express.js** backend that powers an AI assistant similar to **Perplexity AI**.

The backend combines:

- Secure Authentication
- AI Conversations
- Internet Search
- Email Automation
- REST APIs
- MongoDB
- MVC Architecture

The AI system is built using **LangChain**, allowing the application to combine **Mistral AI** with **Tavily Search** for intelligent, internet-aware responses.

---

# ✨ Features

## 🤖 AI Features

- AI Chat
- Internet-enabled AI
- LangChain Integration
- Mistral AI
- Tavily Search
- Context-aware responses
- Markdown-ready output

---

## 🔐 Authentication

- User Registration
- Secure Login
- Password Hashing
- JWT Authentication
- Cookie Authentication
- Protected APIs
- User Verification

---

## 📧 Email Features

- Email Verification
- Welcome Emails
- AI-generated Emails
- Send Emails through AI
- SMTP Integration using Nodemailer

---

## 🛠 Backend

- Express.js REST APIs
- MVC Architecture
- MongoDB
- Mongoose ODM
- Request Validation
- Error Handling
- Middleware
- Environment Configuration

---

# 🛠 Technology Stack

| Category | Technologies |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| AI Framework | LangChain |
| LLM | Mistral AI |
| Search Engine | Tavily AI |
| Authentication | JWT, Cookies |
| Password Security | bcrypt.js |
| Validation | Zod, Express Validator |
| Email | Nodemailer |
| Logging | Morgan |
| Environment | dotenv |

---

# 🏗 Architecture

```
                    Client
                       │
                       ▼
               Express REST API
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 Authentication    AI Controller   Mail Controller
        │              │              │
        ▼              ▼              ▼
 MongoDB        LangChain Engine  Nodemailer
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
        Mistral AI          Tavily Search
```

---

# 📂 Project Structure

```
Backend
│
├── public/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── ...
│
├── package.json
├── server.js
└── README.md
```

---

# 🔐 Authentication Flow

```
User
 │
 ▼
Register
 │
 ▼
Password Hashing
 │
 ▼
MongoDB
 │
 ▼
Email Verification
 │
 ▼
Login
 │
 ▼
JWT Generation
 │
 ▼
Cookie Stored
 │
 ▼
Protected APIs
```

---

# 🤖 AI Workflow

```
User Prompt
      │
      ▼
AI Controller
      │
      ▼
LangChain
      │
 ┌────┴─────────┐
 ▼              ▼
Mistral AI   Tavily Search
      │
      ▼
Merged Response
      │
      ▼
REST API Response
```

---

# 📧 Email Service

The backend includes an integrated email system powered by **Nodemailer**.

Supported features include:

- Email Verification
- Welcome Emails
- AI-generated Emails
- Send emails directly from AI

---

# 🌐 REST APIs

The backend exposes RESTful APIs for:

- Authentication
- User Management
- AI Chat
- Email Services

---

# ⚙ Installation

```bash
git clone https://github.com/DibyanshuChauhan/Perplexity

cd Backend

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root of the **Backend** directory and configure the following variables.

```env
# ==========================================
# Server Configuration
# ==========================================
PORT=3000
NODE_ENV=development

# ==========================================
# Database
# ==========================================
MONGO_URI=your_mongodb_connection_string

# ==========================================
# Authentication
# ==========================================
JWT_SECRET=your_super_secret_jwt_key

# ==========================================
# AI Providers
# ==========================================
GEMINI_API_KEY=your_google_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key

# ==========================================
# Google OAuth (Required for Email Service)
# ==========================================
GOOGLE_USER=your_email@gmail.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

> **⚠️ Important**
>
> - Never commit your `.env` file to version control.
> - Keep all API keys and secrets private.
> - Ensure the MongoDB database is accessible before starting the server.
> - The Google OAuth credentials are required for the AI-powered email functionality powered by **Nodemailer**.
> - Tavily enables the AI to access real-time information from the web.
> - Mistral AI serves as the primary Large Language Model (LLM) through **LangChain**.
> - Gemini API support is included for extensibility and future AI workflows.
---

# ▶ Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📜 Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Starts development server |
| npm start | Starts production server |

---

# 🔒 Security

The backend follows modern security practices including:

- Password Hashing
- JWT Authentication
- Cookie Security
- Environment Variables
- Request Validation
- Protected Routes
- Error Handling

---

# 🚀 Future Improvements

- Refresh Tokens
- OAuth Authentication
- Role Based Authorization
- Rate Limiting
- AI Memory
- Streaming Responses
- Vector Database
- RAG Pipeline
- API Documentation
- Docker Support
- Unit Testing
- CI/CD Pipeline

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Made with ❤️ using **Express.js • LangChain • Mistral AI • MongoDB**

</div>