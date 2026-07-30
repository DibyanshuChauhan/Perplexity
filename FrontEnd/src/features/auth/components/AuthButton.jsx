import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";

const AuthButton = ({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  className = "",
}) => {
  return (
    <motion.button
      whileHover={loading ? {} : { y: -1 }}
      whileTap={loading ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
      type={type}
      disabled={loading || disabled}
      className={`
        relative flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 overflow-hidden select-none cursor-pointer
        ${
          loading
            ? "bg-teal-950/40 border border-teal-500/30 text-teal-400 shadow-lg shadow-teal-500/5"
            : "bg-teal-600 hover:bg-teal-500 shadow-xl shadow-teal-950/20 disabled:cursor-not-allowed disabled:opacity-40"
        }
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2.5">
          <ImSpinner8 className="animate-spin text-sm text-teal-400" />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="tracking-wide font-medium font-mono text-xs uppercase"
          >
            Authenticating Core...
          </motion.span>
        </div>
      ) : (
        <>
          {children}
          <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </motion.button>
  );
};

export default AuthButton;
