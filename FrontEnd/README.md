<div align="center">

# 🎨 Perplexity Frontend

### A Modern AI Chat Interface Inspired by Perplexity AI

<p align="center">
A sleek, responsive, and interactive frontend built with <b>React 19</b>, <b>Vite</b>, <b>Redux Toolkit</b>, and <b>Tailwind CSS</b>, delivering a seamless AI chat experience with beautiful animations, markdown rendering, and intuitive user interactions.
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React-Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-Rendering-000000?style=for-the-badge&logo=markdown)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

---

### ⚡ Fast • 🎨 Beautiful • 🤖 AI Powered • 📱 Responsive

</div>

---

# 📖 Table of Contents

- Overview
- Features
- Technology Stack
- UI Components
- Application Architecture
- Folder Structure
- Authentication Flow
- Chat Flow
- Installation
- Environment Variables
- Running the Project
- Available Scripts
- Responsive Design
- Future Improvements

---

# 🚀 Overview

The **Perplexity Frontend** is a modern AI-powered web application designed to deliver an intuitive conversational experience inspired by **Perplexity AI**.

The application focuses on delivering a premium user experience through:

- Beautiful animations
- Responsive layouts
- Smooth AI conversations
- Markdown rendering
- Intelligent loading states
- Modern authentication flow
- Clean component architecture

The frontend communicates with an Express.js backend that handles authentication, AI responses, email services, and internet-enabled search using LangChain.

---

# ✨ Features

## 🤖 AI Experience

- AI Chat Interface
- Markdown Response Rendering
- Thinking Animation
- Typing Effect
- Loading Indicators
- Internet-enabled AI Responses
- Clean Conversation UI

---

## 👤 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Persistent User Session

---

## 💬 Chat Experience

- Sidebar Navigation
- Previous Conversations
- Responsive Chat Layout
- Auto Scroll
- Markdown Support
- Code Block Rendering
- AI Generated Email Support

---

## 🎨 UI/UX

- Fully Responsive Design
- Modern Glassmorphism UI
- Smooth Page Animations
- Beautiful Icons
- Interactive Buttons
- Clean Typography
- Mobile Friendly

---

# 🛠 Technology Stack

| Category | Technology |
|-----------|------------|
| Framework | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Icons | React Icons |
| Markdown | React Markdown |
| Markdown Plugins | Remark GFM |

---

# 🧩 UI Components

The frontend follows a modular and reusable component architecture, where each component is responsible for a single piece of functionality. This keeps the codebase maintainable, scalable, and easy to extend.

```
src
│
├── app/
├── context/
├── features/
│   ├── auth/
│   └── chat/
│       ├── components/
│       │   ├── EmailMessageCard.jsx
│       │   ├── Loader.jsx
│       │   ├── Sidebar.jsx
│       │   ├── ThinkingIndicator.jsx
│       │   └── TypingEffect.jsx
│       │
│       ├── hooks/
│       ├── pages/
│       ├── service/
│       └── chat.slice.js
│
└── main.jsx
```

### 📁 Component Overview

| Component | Description |
|------------|-------------|
| **Sidebar** | Provides navigation between conversations and manages the chat history interface. |
| **Loader** | Displays elegant loading animations while waiting for server responses. |
| **ThinkingIndicator** | Indicates that the AI is processing the user's prompt before generating a response. |
| **TypingEffect** | Animates AI responses with a smooth character-by-character typing effect for a natural conversational experience. |
| **EmailMessageCard** | Renders AI-generated emails in a clean, structured card layout before they are sent to recipients. |

---

### 🏗 Feature-Based Organization

Instead of organizing files solely by type, the application follows a **feature-first architecture**.

```
features/
│
├── auth/
│     ├── pages
│     ├── services
│     ├── state
│     └── authentication logic
│
└── chat/
      ├── components
      ├── hooks
      ├── pages
      ├── services
      ├── Redux Slice
      └── AI chat logic
```

This approach keeps authentication and chat-related code isolated, making the project easier to scale, maintain, and extend as new features are introduced.
---

# 🏗 Application Architecture

```
                 User
                   │
                   ▼
          React Application
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
 Authentication   Chat UI    Redux Store
       │           │           │
       └───────────┼───────────┘
                   │
                   ▼
              Axios Requests
                   │
                   ▼
          Express Backend APIs
                   │
                   ▼
          AI + Authentication
```

---

# 📂 Project Structure

```
FrontEnd
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🔐 Authentication Flow

```
User

 │

 ▼

Login / Register

 │

 ▼

Axios Request

 │

 ▼

Backend API

 │

 ▼

JWT Token

 │

 ▼

Protected Routes

 │

 ▼

Dashboard / Chat
```

---

# 🤖 AI Chat Flow

```
User Prompt

     │

     ▼

React Component

     │

     ▼

Redux Action

     │

     ▼

Axios API Request

     │

     ▼

Backend

     │

     ▼

LangChain + AI

     │

     ▼

Markdown Response

     │

     ▼

Typing Effect

     │

     ▼

Displayed to User
```

---

# 🎨 UI Highlights

The interface includes several custom-built components that enhance the overall user experience.

### ✨ Sidebar

Organized navigation for conversations and account management.

### 🤔 Thinking Indicator

Displays when the AI is processing a request.

### ⌨️ Typing Effect

Streams AI responses with a natural typing animation.

### ⏳ Loader

Elegant loading indicators throughout the application.

### 📄 Markdown Renderer

Supports:

- Headings
- Lists
- Tables
- Links
- Images
- Code Blocks
- Blockquotes

using **React Markdown** and **Remark GFM**.

---

# ⚙ Installation

```bash
git clone https://github.com/DibyanshuChauhan/Perplexity

cd FrontEnd

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root of the frontend project.

```env
VITE_API_URL=http://localhost:3000
```

---

# ▶ Running the Project

Development

```bash
npm run dev
```

Production Build

```bash
npm run build
```

Preview Build

```bash
npm run preview
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

# 📱 Responsive Design

The application is optimized for:

- 💻 Desktop
- 🖥 Large Screens
- 📱 Mobile Devices
- 📟 Tablets

Built with a mobile-first approach using Tailwind CSS.

---

# 🚀 Future Improvements
- Theme Customization
- Voice Input
- Speech Synthesis
- PWA Support
- Drag & Drop File Uploads
- Multi-language Support
- AI Conversation Export
- Accessibility Enhancements
- Performance Optimizations

---

# ❤️ Built With

- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- Framer Motion
- React Markdown
- React Router

---

<div align="center">

## ⭐ Star this repository if you found it useful!

Designed & Developed with ❤️ using **React • Vite • Tailwind CSS • Redux Toolkit**

</div>