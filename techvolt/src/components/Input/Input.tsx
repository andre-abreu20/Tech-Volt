import { InputProps } from "@/types/types";
import { motion } from "framer-motion";

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  name,
  type,
}: InputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2"
    >
      <motion.label htmlFor={name} className="text-sm font-bold text-green-1">
        {label}
      </motion.label>
      <motion.input
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0 }}
        type={type || "text"}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full px-8 py-3 
                  border-2 border-transparent
                  focus:outline-none focus:border-green-2 
                  placeholder-gray-400 
                  transition-all duration-300 
                  shadow-md"
      />
    </motion.div>
  );
}
