/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const TypingEffect = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (index < text.length) {
        // Appends one slice character at a time based on velocity speed settings
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="m-0 leading-relaxed text-neutral-300">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="ml-5 list-disc space-y-1.5 text-neutral-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="ml-5 list-decimal space-y-1.5 text-neutral-300">
            {children}
          </ol>
        ),
        code: ({ children, className }) => (
          <code
            className={`rounded-md bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-[13px] font-mono text-neutral-300 ${className || ""}`}
          >
            {children}
          </code>
        ),
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};

export default TypingEffect;
