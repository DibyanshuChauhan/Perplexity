import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import { useAuth } from "../hook/useAuth";
import { useToast } from "../../../context/ToastContext";

const ResendVerification = () => {
  const location = useLocation();

const [email, setEmail] = useState(location.state?.email || "");
const [loading, setLoading] = useState(false);
const [countdown, setCountdown] = useState(0);

useEffect(() => {
  if (countdown <= 0) return;

  const timer = setInterval(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [countdown]);

  const { handleResendVerification } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Structural Pre-flight Validation check
    if (!email.trim()) {
      return showToast(
        "Please input your email address configuration.",
        "warning",
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return showToast(
        "Invalid address syntax: Check email structure.",
        "warning",
      );
    }

    try {
      setLoading(true);

      // Dispatch request context to authentication layer
      const response = await handleResendVerification(email);

      // Success payload received from your backend handler
      showToast(
  response?.message || "Verification email sent successfully!",
  "success"
);

// Prevent multiple resend requests
setCountdown(60);

// Keep the email in the input
    } catch (error) {
      // Catch expected failure states from express validators or user existence logic
      if (
        error.response?.data?.errors &&
        Array.isArray(error.response.data.errors)
      ) {
        error.response.data.errors.forEach((err) =>
          showToast(err.msg, "error"),
        );
      } else {
        showToast(
          error.response?.data?.message ||
            "Verification request rejected by authentication cluster node.",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
  title="Verify your Email"
  subtitle="We've already sent you a verification email. If you didn't receive it, request another one below."
>
      <form onSubmit={handleSubmit} className="space-y-6 select-none">
        <AuthInput
  label="Registered Email Address"
  type="email"
  name="email"
  placeholder="you@example.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  autoComplete="email"
  icon={FiMail}
/>

        <AuthButton
  loading={loading}
  disabled={countdown > 0}
>
  {countdown > 0
    ? `Resend in ${countdown}s`
    : "Resend Verification Email"}
</AuthButton>
      </form>

      <div className="mt-8 text-center text-xs font-medium text-neutral-500 space-y-2 select-none">
        <p>
          Already verified your email?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-400 transition hover:text-teal-300"
          >
            Sign In
          </Link>
        </p>
        <p>
          New user?{" "}
          <Link
            to="/register"
            className="font-bold text-neutral-400 transition hover:text-neutral-200"
          >
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ResendVerification;
