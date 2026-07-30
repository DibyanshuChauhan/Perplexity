import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMail, FiZap } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import AuthButton from "../components/AuthButton";
import { useAuth } from "../hook/useAuth";
import { useToast } from "../../../context/ToastContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isConstructing, setIsConstructing] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { showToast } = useToast(); // Extract toast control method

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Pre-flight Validation Check
    if (!email.trim() || !password) {
      return showToast("Please input both identification fields.", "warning");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return showToast(
        "Invalid address syntax: Check email structure.",
        "warning",
      );
    }

    try {
      const payload = { email, password };

      // Dispatch login request to authentication services
      await handleLogin(payload);

      // If credentials successfully clear the node, clean input states and launch HUD environment loader
      setEmail("");
      setPassword("");
      setIsConstructing(true);

      // Smoothly hold viewport layout execution frames for transition animation sweep
      setTimeout(() => {
        showToast(
          "Access authenticated. Session token initialized.",
          "success",
        );
        navigate("/");
      }, 1600);
    } catch (error) {
  console.log("ERROR DATA:", error.response?.data);

  navigate("/resend-verification", {
    state: {
      email,
    },
    replace: true,
  });

  return;
}
  };

  return (
    <>
      {/* Immersive Environment Construction Loader */}
      <AnimatePresence>
        {isConstructing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d]"
          >
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

            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-16 w-16 rounded-2xl border border-teal-500/30"
              />
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shadow-xl shadow-teal-500/5">
                <FiZap size={22} className="animate-pulse" />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-[10px] font-semibold tracking-widest text-neutral-400 uppercase font-mono"
            >
              Constructing User Workspace...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Login Frame Form Context */}
      <motion.div
        animate={
          isConstructing
            ? { scale: 0.96, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.4 }}
        className="h-full w-full"
      >
        <AuthLayout
          title="Welcome back"
          subtitle="Sign in to continue using Perplexity AI."
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              icon={FiMail}
            />

            <PasswordInput
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <AuthButton loading={loading}>Sign In</AuthButton>

            <div className="mt-4 text-center">
              <Link
                to="/resend-verification"
                className="text-xs font-medium text-teal-400 transition hover:text-teal-300"
              >
                Didn't receive the verification email?
              </Link>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-medium text-neutral-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-teal-400 transition hover:text-teal-300"
            >
              Create one
            </Link>
          </p>
        </AuthLayout>
      </motion.div>
    </>
  );
};

export default Login;
