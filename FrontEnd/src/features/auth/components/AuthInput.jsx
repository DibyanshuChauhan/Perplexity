import { motion } from "framer-motion";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  autoComplete,
  error,
  required = true,
}) => {
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
        {Icon && (
          <Icon
            size={18}
            className="mr-3 text-neutral-600 transition-colors duration-300 group-focus-within:text-teal-400"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-transparent text-neutral-200 placeholder:text-neutral-600 outline-none text-sm"
        />
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

export default AuthInput;