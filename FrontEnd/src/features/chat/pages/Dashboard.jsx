/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AnimatePresence, motion } from "framer-motion";

import { FiZap, FiX, FiMenu, FiChevronDown, FiMail } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import EmailMessageCard from "../components/EmailMessageCard";
import EmailIntegration from "./EmailIntegration"; 
import { useToast } from "../../../context/ToastContext";
import Loader from "../components/Loader";
import ThinkingIndicator from "../components/ThinkingIndicator";
import TypingEffect from "../components/TypingEffect";

const Dashboard = () => {
  const chat = useChat();
  const { showToast } = useToast(); 
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [animateLatest, setAnimateLatest] = useState(false);
  const [activeTab, setActiveTab] = useState("threads");

  const messagesEndRef = useRef(null);

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const { user } = useSelector((state) => state.auth);

  const activeChat = chats[currentChatId];
  const isEmailChat = activeChat?.chatType === "email";

  // ✅ Clean Markdown from titles
  const cleanTitle = (title) => {
    if (!title) return activeTab === "emails" ? "Email Dispatch" : "New Conversation";
    
    return title
      .replace(/[#*_`~>[\]]/g, '')                    // Remove common markdown chars
      .replace(/\*\*(.*?)\*\*/g, '$1')                // Bold
      .replace(/\*(.*?)\*/g, '$1')                    // Italic
      .replace(/__(.*?)__/g, '$1')                    // Underline
      .replace(/`(.*?)`/g, '$1')                      // Inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')             // Links
      .replace(/\n/g, ' ')                            // Remove newlines
      .trim()
      .slice(0, 65);                                  // Limit length
  };

  const displayTitle = cleanTitle(activeChat?.title);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isThinking]);

  useEffect(() => {
    chat.handleGetChats();
  }, []);

  useEffect(() => {
    if (currentChatId && chats[currentChatId] && chats[currentChatId].messages.length === 0) {
      setAnimateLatest(false);
      chat.handleOpenChat(currentChatId, chats);
    }
  }, [chats, currentChatId]);

  const handleSendMessagePayload = async (compiledMessage, currentMode) => {
    try {
      if (compiledMessage.startsWith("Send an email")) {
        showToast("Compiling intelligence and preparing email brief...", "info");
      }

      setIsThinking(true);
      setAnimateLatest(true);

      await chat.handleSendMessage({
        message: compiledMessage,
        chatId: currentChatId,
        chatType: currentMode
      });

      if (compiledMessage.startsWith("Send an email")) {
        showToast("Email dispatched successfully!", "success");
      }
    } catch (error) {
      showToast("An error occurred while sending message.", "error");
    } finally {
      setIsThinking(false);
    }
  };

  const openChat = (chatId) => {
    setAnimateLatest(false);
    chat.handleOpenChat(chatId, chats);
    setSidebarOpen(false);
  };

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    try {
      await chat.handleDeleteChat(chatId);
      showToast("Conversation thread permanently removed.", "success");
    } catch (error) {
      showToast("Failed to delete the selected thread.", "error");
    }
  };

  const handleNewThread = () => {
    setAnimateLatest(false);
    chat.handleOpenChat(null, chats);
    setSidebarOpen(false);
    showToast("New operational workspace initialized.", "info");
  };

  const displayMessages = activeChat?.messages?.filter(msg => {
    if (isEmailChat) return true;
    return msg.role !== "email";
  }) || [];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader />}
      </AnimatePresence>

      <main className="h-screen w-full flex bg-[#0d0d0d] text-neutral-200 overflow-hidden relative font-sans antialiased">
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col bg-[#0b0b0b] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <Sidebar
            chats={chats}
            currentChatId={currentChatId}
            user={user}
            openChat={openChat}
            handleDelete={handleDelete}
            handleNewThread={handleNewThread}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-5 right-4 p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <FiX size={16} />
          </button>
        </aside>

        <section className="flex-1 flex flex-col min-w-0 bg-[#0f0f0f]">
          <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-900 bg-[#0e0e0e]/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 text-neutral-400 transition-all cursor-pointer"
              >
                <FiMenu size={18} />
              </button>
              <h2 className="text-sm font-semibold text-neutral-200 truncate max-w-xs sm:max-w-md lg:max-w-xl">
                {displayTitle}
              </h2>
            </div>

            <button className="hidden sm:flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-500 hover:text-neutral-300 uppercase transition-colors cursor-pointer bg-neutral-900/40 px-3 py-1.5 rounded-lg border border-neutral-900">
              Engine: Mistral-Small-Latest
              <FiChevronDown size={12} />
            </button>
          </header>

          {/* Rest of the code remains same as previous version */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-24 py-8 space-y-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {activeChat?.messages && activeChat.messages.length > 0 ? (
              displayMessages.map((msg, index) => {
                const isLatestMessage = index === displayMessages.length - 1;
                const isEmailResponse = msg.role === "email" || isEmailChat;

                if (msg.role === "user") {
                  return (
                    <div key={msg.id || msg._id || index} className="flex justify-end">
                      <div className="max-w-[80%] sm:max-w-[65%] bg-neutral-800 border border-neutral-700/40 rounded-2xl rounded-tr-sm px-4.5 py-3 text-sm text-neutral-100 shadow-lg shadow-black/10 leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  );
                }

                if (msg.role === "email") {
                  return (
                    <div key={msg.id || msg._id || index} className="flex gap-4 max-w-3xl">
                      <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400">
                        <FiMail size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <EmailMessageCard
                          details={msg.emailDetails}
                          content={msg.content}
                        />
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id || msg._id || index} className="flex gap-4 max-w-3xl">
                    <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400">
                      {isEmailResponse ? <FiMail size={15} /> : <FiZap size={15} />}
                    </div>
                    <div className="flex-1 text-sm leading-relaxed text-neutral-300 space-y-4">
                      {isLatestMessage && animateLatest ? (
                        <TypingEffect text={String(msg.content || "")} speed={12} />
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="m-0 leading-relaxed text-neutral-300">{children}</p>,
                            ul: ({ children }) => <ul className="ml-5 list-disc space-y-1.5 text-neutral-300">{children}</ul>,
                            ol: ({ children }) => <ol className="ml-5 list-decimal space-y-1.5 text-neutral-300">{children}</ol>,
                            table: ({ children }) => (
                              <div className="my-4 overflow-x-auto rounded-xl border border-neutral-800 bg-[#121212] shadow-md">
                                <table className="min-w-full border-collapse text-xs text-left">{children}</table>
                              </div>
                            ),
                            thead: ({ children }) => <thead className="bg-neutral-900/50 border-b border-neutral-800 text-neutral-200">{children}</thead>,
                            tbody: ({ children }) => <tbody className="divide-y divide-neutral-900">{children}</tbody>,
                            tr: ({ children }) => <tr className="hover:bg-neutral-900/20 transition-colors">{children}</tr>,
                            th: ({ children }) => <th className="px-4 py-3 font-semibold text-neutral-300 border-r border-neutral-900 last:border-r-0">{children}</th>,
                            td: ({ children }) => <td className="px-4 py-3 text-neutral-400 border-r border-neutral-900 last:border-r-0">{children}</td>,
                            code: ({ children, className }) => (
                              <code className={`rounded-md bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[13px] font-mono text-neutral-300 ${className || ""}`}>
                                {children}
                              </code>
                            ),
                          }}
                        >
                          {String(msg.content || "")}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto pt-24 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-2 shadow-lg shadow-teal-500/5 animate-pulse">
                  {activeTab === "emails" ? <FiMail size={22} /> : <FiZap size={22} />}
                </div>
                <h3 className="text-lg font-semibold text-neutral-200">
                  {activeTab === "emails" ? "No Email Dispatches Yet" : "Where will your curiosity lead?"}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {activeTab === "emails" 
                    ? "Your sent emails will appear here." 
                    : "Search real-time internet indices or compile sophisticated email briefs dynamically."}
                </p>
              </div>
            )}
            {isThinking && <ThinkingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 sm:px-8 lg:px-24 pb-6 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent pt-4">
            <EmailIntegration
              onSubmitMessage={handleSendMessagePayload}
              currentPlaceholder={activeTab === "emails" 
                ? "What details should the AI compile and draft to send?" 
                : "Ask anything using Web Search or request an automated email..."}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;