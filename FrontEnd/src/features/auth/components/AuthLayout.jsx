import { motion } from "framer-motion";
import { FiZap } from "react-icons/fi";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d] px-6 py-12 select-none">
      
      {/* Premium Deep/Soft Background Glows */}
      <div className="absolute -left-44 -top-44 h-128 w-lg rounded-full bg-teal-500/5 blur-[160px]" />
      <div className="absolute -right-44 bottom-0 h-136 w-136 rounded-full bg-emerald-500/5 blur-[180px]" />

      {/* Grid Pattern Background - Muted */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-neutral-800/80 bg-[#111111] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.65)] backdrop-blur-2xl md:p-10"
      >
        {/* Brand Logo Header */}
        <div className="flex justify-center mb-6">
          <div className="h-10 w-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/10">
            <FiZap className="text-neutral-950" size={20} />
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
            {title}
          </h1>
          <p className="mt-2.5 text-xs font-medium text-neutral-500">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;