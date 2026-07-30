import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d]"
    >
      {/* Premium Outer Tech Grid Pattern Elements */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Pulsing Animated Brand Icon Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Ring Expansion */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0, 0.15],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-16 w-16 rounded-2xl border border-teal-500/30"
        />

        {/* Core Identity Plate */}
        <motion.div
          animate={{
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-xl shadow-teal-500/5"
        >
          <FiZap size={22} className="animate-pulse" />
        </motion.div>
      </div>

      {/* Micro Typography Feedback */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-5 text-[10px] font-semibold tracking-widest text-neutral-400 uppercase font-mono"
      >
        Initializing Workspace...
      </motion.p>
    </motion.div>
  );
};

export default Loader;
