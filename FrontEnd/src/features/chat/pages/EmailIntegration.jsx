import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiZap, FiSend, FiPaperclip } from "react-icons/fi";
import { useToast } from "../../../context/ToastContext";

const EmailIntegration = ({ onSubmitMessage, currentPlaceholder }) => {
  const { showToast } = useToast();
  const [activeMode, setActiveMode] = useState("search"); // "search" | "email"
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");

  const handleModeSwitch = (mode) => {
    setActiveMode(mode);
    if (mode === "email") {
      showToast(
        "Email interface loaded. Configure recipient credentials.",
        "info",
      );
    } else {
      showToast("Returned to Web Search indexing engine.", "info");
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  let finalPayload = message;

  if (activeMode === "email") {
    finalPayload = `Send an email to ${recipientEmail} with the subject "${emailSubject || "AI Research Brief"}". Base the email content on the following request: ${message}`;
  }

  // Pass BOTH the message text string AND the target activeMode workspace state type
  onSubmitMessage(finalPayload, activeMode); 

  setMessage("");
  if (activeMode === "email") {
    setRecipientEmail("");
    setEmailSubject("");
    setActiveMode("search");
  }
};

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#111111] border border-neutral-800/80 w-fit rounded-xl">
        <button
          type="button"
          onClick={() => handleModeSwitch("search")}
          className={`relative px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg cursor-pointer transition-colors duration-200 ${
            activeMode === "search"
              ? "text-neutral-950 font-bold"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {activeMode === "search" && (
            <motion.div
              layoutId="activeModeTab"
              className="absolute inset-0 bg-teal-500 rounded-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <FiZap size={12} />
            Web Search
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleModeSwitch("email")}
          className={`relative px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-lg cursor-pointer transition-colors duration-200 ${
            activeMode === "email"
              ? "text-neutral-950 font-bold"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {activeMode === "email" && (
            <motion.div
              layoutId="activeModeTab"
              className="absolute inset-0 bg-teal-500 rounded-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <FiSend size={11} />
            Email Mode
          </span>
        </button>
      </div>

      {/* Input Form Wrapper */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-[#111111] border border-neutral-800/80 focus-within:border-teal-500/40 rounded-2xl p-3 transition-all shadow-xl shadow-black/40"
      >
        <AnimatePresence initial={false}>
          {activeMode === "email" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-b border-neutral-800/60 pb-2.5 mb-2.5 space-y-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="Recipient: name@domain.com"
                  className="bg-neutral-900/40 border border-neutral-800 focus:border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none placeholder:text-neutral-600 w-full transition-colors"
                />
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject: e.g., Weekly Summary Report"
                  className="bg-neutral-900/40 border border-neutral-800 focus:border-neutral-700/80 rounded-xl px-3 py-2 text-xs text-neutral-200 outline-none placeholder:text-neutral-600 w-full transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-3">
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 transition-colors shrink-0 cursor-pointer mb-0.5"
          >
            <FiPaperclip size={18} />
          </button>

          <textarea
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={
              activeMode === "email"
                ? "What details should the AI compile and draft to send?"
                : currentPlaceholder ||
                  "Type your instruction or ask anything..."
            }
            className="flex-1 bg-transparent outline-none resize-none text-sm placeholder:text-neutral-600 text-neutral-200 max-h-32 py-1.5 leading-relaxed"
          />

          <button
            type="submit"
            disabled={
              !message.trim() || (activeMode === "email" && !recipientEmail)
            }
            className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-neutral-800 disabled:text-neutral-600 transition-all shrink-0 cursor-pointer text-neutral-950 font-bold"
          >
            <FiSend size={15} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailIntegration;
