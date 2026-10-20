# 🎨 Perplexity AI — Frontend Application

<p align="center">
  <a href="https://perplexity-3cxu.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Live_App-perplexity--3cxu.onrender.com-00C7B7?style=for-the-badge&logo=render&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.x-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/React_Markdown-9.x-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="React Markdown" />
</p>

---

## 📌 Overview

> 🌐 **Live Web App:** [https://perplexity-3cxu.onrender.com/](https://perplexity-3cxu.onrender.com/)

The **Perplexity Frontend** is a modern Single Page Application (SPA) designed to deliver a snappy conversational search and task execution experience. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, it couples state management via **Redux Toolkit** with micro-animations via **Framer Motion** to deliver a responsive, clean interface.

---

## 📑 Table of Contents

- [Key User Experience Features](#-key-user-experience-features)
- [Folder Structure](#-folder-structure)
- [Feature-First Architecture](#-feature-first-architecture)
- [UI Components Overview](#-ui-components-overview)
- [State Management (Redux Store)](#-state-management-redux-store)
- [Installation & Running](#-installation--running)
- [Environment Configuration](#-environment-configuration)
- [Scripts Reference](#-scripts-reference)
- [Responsive & Visual Design](#-responsive--visual-design)

---

## ✨ Key User Experience Features

- 💬 **Dynamic Search vs. Email Mode:** Intuitive mode toggle enabling users to effortlessly switch between real-time web research and autonomous email composition.
- ⚡ **Typewriter Effect:** Animated AI response streaming that smoothly renders markdown tokens, headers, tables, code blocks, and lists.
- 🧠 **Inline Thinking Indicator:** Non-intrusive animated status indicator notifying users while LangChain evaluates internet searches or drafts emails.
- ✉️ **Interactive Email Cards:** Renders specialized email status widgets directly inside the conversation thread showing delivery state, recipient, and subject.
- 📂 **Session Drawer & History:** Instant switching between conversation threads, with automated title naming and thread deletion.
- 🔔 **Global Toast System:** Custom floating toast notification provider supporting success, warning, error, and operational info alerts.

---

## 📂 Folder Structure

```text
FrontEnd/
│
├── public/                       # Static public assets
│
├── src/
│   ├── app/                      # Application core configuration
│   │   ├── app.css               # Global application CSS
│   │   ├── App.jsx               # App component with router outlet
│   │   ├── app.routes.jsx        # Route definitions & Protected Route wrappers
│   │   ├── app.store.js          # Centralized Redux Toolkit store
│   │   └── index.css             # Tailwind CSS imports & theme directives
│   │
│   ├── context/
│   │   └── ToastContext.jsx      # Global Toast Notification provider & hook
│   │
│   ├── features/
│   │   ├── auth/                 # User authentication domain
│   │   │   ├── components/       # AuthInput, PasswordInput, AuthButton, Protected
│   │   │   ├── hook/             # useAuth hook (register, login, logout, getMe)
│   │   │   ├── pages/            # Login, Register, ResendVerification
│   │   │   ├── service/          # auth.api.js (Axios authentication client)
│   │   │   └── auth.slice.js     # Redux slice for user session & loading state
│   │   │
│   │   └── chat/                 # Conversational AI domain
│   │       ├── components/       # Sidebar, ThinkingIndicator, TypingEffect, EmailCard
│   │       ├── hooks/            # useChat hook (send message, select chat, delete)
│   │       ├── pages/            # Dashboard (chat main), EmailIntegration
│   │       ├── service/          # chat.api.js (Axios chat & messages client)
│   │       └── chat.slice.js     # Redux slice for chats, messages & active thread
│   │
│   └── main.jsx                  # React DOM mount point & Redux Provider setup
│
├── index.html                    # HTML entry template
├── package.json                  # Dependencies & npm scripts
└── vite.config.js                # Vite build and plugin configuration
```

---

## 🏗 Feature-First Architecture

The frontend is structured around **feature domains** (`auth` and `chat`) rather than technical file types. Each feature encapsulates:

- **State:** Dedicated Redux slices (`auth.slice.js`, `chat.slice.js`)
- **Services:** Isolated Axios API client methods (`auth.api.js`, `chat.api.js`)
- **Custom Hooks:** Clean reactive controllers (`useAuth.js`, `useChat.js`)
- **Components & Pages:** Specialized UI elements tailored to the domain

This ensures high cohesion, zero clutter, and seamless scalability as new features are added.

---

## 🧩 UI Components Overview

| Component | Location | Purpose |
| :--- | :--- | :--- |
| **Dashboard** | `features/chat/pages/Dashboard.jsx` | Main layout orchestrating the chat stream, mode toggles, and query input. |
| **Sidebar** | `features/chat/components/Sidebar.jsx` | Slide-out navigation drawer displaying past conversation threads. |
| **ThinkingIndicator** | `features/chat/components/ThinkingIndicator.jsx` | Animated pill displayed while the AI agent queries Tavily or drafts emails. |
| **TypingEffect** | `features/chat/components/TypingEffect.jsx` | Simulates natural character streaming while preserving Markdown format. |
| **EmailMessageCard** | `features/chat/components/EmailMessageCard.jsx` | Specialized card showing recipient, subject line, and sent/failed status. |
| **ToastProvider** | `context/ToastContext.jsx` | Fixed-position toast manager with auto-dismiss timers and Framer Motion transitions. |

---

## 🧠 State Management (Redux Store)

The store (`src/app/app.store.js`) combines two primary state slices:

### `auth` Slice
- `user`: Authenticated user object `{ id, username, email, verified }`.
- `loading`: Boolean state for authentication dispatches.
- `authChecked`: Tracks whether initial session verification has run.
- `error`: Stores recent authentication error messages.

### `chat` Slice
- `chats`: Dictionary storing chat metadata and message histories indexed by ID.
- `currentChatId`: ID of the currently focused conversation session.
- `loading`: Tracks thread provisioning and message queries.

---

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Generates optimized, minified production assets in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔑 Environment Configuration

Create a file named `.env` in the `FrontEnd/` root directory:

```env
# URL of your running Express backend
VITE_API_URL=http://localhost:3000
```

> **Note:** If `VITE_API_URL` is omitted, the API service defaults to `http://localhost:3000/api`.

---

## 📜 Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches the Vite local dev server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and tree-shakes JSX and CSS for production deployment. |
| `npm run preview` | Spins up a local web server to test the production bundle. |
| `npm run lint` | Analyzes code for syntax errors and formatting discrepancies using ESLint. |

---

## 📱 Responsive & Visual Design

- **Dark Theme Aesthetics:** Deep neutral backgrounds (`#0d0d0d`, `#121212`) paired with clean emerald and teal accent highlights.
- **Glassmorphism:** Frosted backdrop filters (`backdrop-blur-md`) applied across floating cards, modals, and toasts.
- **Mobile First:** Responsive sidebar collapses into a slide-over mobile drawer on screens `< 768px`.