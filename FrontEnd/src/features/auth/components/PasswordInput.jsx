import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  error,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-xs font-semibold tracking-wide text-neutral-400 uppercase"
      >
        {label}
      </label>

      <motion.div
        whileFocus={{ scale: 1.005 }}
        className={`
          group flex items-center rounded-xl border px-4 py-3 transition-all duration-300
          ${
            error
              ? "border-rose-500/50 bg-rose-500/5"
              : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700/80"
          }
          focus-within:border-teal-500/50 focus-within:ring-4 focus-within:ring-teal-500/5
        `}
      >
        <FiLock
          size={18}
          className="mr-3 text-neutral-600 transition-colors duration-300 group-focus-within:text-teal-400"
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-600 outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-2 rounded-lg p-1.5 text-neutral-600 transition-all duration-200 hover:bg-neutral-800 hover:text-neutral-300 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium text-rose-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default PasswordInput;