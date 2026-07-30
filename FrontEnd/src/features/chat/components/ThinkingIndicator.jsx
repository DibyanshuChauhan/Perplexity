import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

const ThinkingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex gap-4 max-w-3xl items-start animate-fade-in">
      {/* AI Logo Icon Wrapper */}
      <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20 text-teal-400">
        <FiZap size={15} className="animate-pulse" />
      </div>

      {/* Animated Thinking Bubble Panel */}
      <div className="flex items-center gap-1.5 bg-neutral-900/40 border border-neutral-800/60 rounded-2xl rounded-tl-sm px-4 py-3.5">
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0 }}
          className="h-2 w-2 rounded-full bg-teal-500/70"
        />
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.15 }}
          className="h-2 w-2 rounded-full bg-teal-500/50"
        />
        <motion.span
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="h-2 w-2 rounded-full bg-teal-500/30"
        />
      </div>
    </div>
  );
};

export default ThinkingIndicator;
