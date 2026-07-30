import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronDown,
//   FiExternalLink,
} from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EmailMessageCard = ({ details, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSent = details?.status === "sent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl my-4 overflow-hidden rounded-xl border border-neutral-800 bg-[#121212] shadow-xl shadow-black/30"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 bg-neutral-900/50 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${isSent ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
          >
            <FiMail size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-400">
                EMAIL ACTION DETECTED
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  isSent
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {isSent ? (
                  <FiCheckCircle size={10} />
                ) : (
                  <FiAlertCircle size={10} />
                )}
                {isSent ? "Dispatched" : "Delivery Failed"}
              </span>
            </div>
            <p className="text-sm font-semibold text-neutral-200 mt-0.5">
              To: {details?.to || "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown size={18} />
          </motion.div>
        </button>
      </div>

      {/* Accordion detail content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-[#0d0d0d]/80 border-t border-neutral-900"
          >
            <div className="p-4 space-y-3">
              <div className="flex flex-col gap-1 text-xs border-b border-neutral-800/60 pb-3">
                <p className="text-neutral-500">
                  <strong className="text-neutral-400">Subject:</strong>{" "}
                  {details?.subject || "(No Subject)"}
                </p>
                <p className="text-neutral-500">
                  <strong className="text-neutral-400">
                    System Integration:
                  </strong>{" "}
                  Nodemailer Client Agent
                </p>
              </div>

              {/* Draft Body preview */}
              <div className="text-sm text-neutral-300 leading-relaxed max-h-64 overflow-y-auto pr-1">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 text-neutral-300 last:mb-0">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="ml-4 list-disc space-y-1 mb-3">
                        {children}
                      </ul>
                    ),
                    table: ({ children }) => (
                      <div className="my-3 overflow-x-auto rounded-lg border border-neutral-800">
                        <table className="min-w-full border-collapse text-xs text-left">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-neutral-900 px-3 py-2 font-medium border-b border-neutral-800 text-neutral-200">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-3 py-2 border-b border-neutral-900 text-neutral-400">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailMessageCard;
