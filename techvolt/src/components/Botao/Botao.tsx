import { BotaoProps } from "@/types/types";
import { motion } from "framer-motion";

export default function Botao({
  children,
  type = "button",
  onClick,
  width = "full",
  variant = "default",
}: BotaoProps) {
  const variants = {
    default: `text-white bg-green-1 hover:bg-green-3`,
    white: `text-green-1 bg-white hover:bg-gray-100 border-2 border-transparent`,
  };

  const hoverEffect = {
    default: {
      boxShadow: "0px 15px 20px rgba(90, 149, 94, 0.4)",
      background: "linear-gradient(135deg, var(--green-1), var(--green-3))",
    },
    white: {
      boxShadow: "0px 15px 20px rgba(90, 149, 94, 0.2)",
      background: "#ffffff",
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      initial={{ 
        opacity: 0, 
        scale: 0.8,
        background: variant === "white" ? "#ffffff" : "var(--green-1)" 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        background: variant === "white" ? "#ffffff" : "var(--green-1)"
      }}
      transition={{ duration: 0.3 }}
      whileHover={hoverEffect[variant]}
      className={`
        px-6 md:px-12 py-3 md:py-5 
        text-xs font-semibold tracking-[2.5px] uppercase
        ${variants[variant]}
        rounded-[45px] shadow-lg
        transition-all duration-300
        focus:outline-none
        cursor-pointer
        whitespace-nowrap
        min-w-[120px] md:min-w-[150px]
      `}
    >
      {children}
    </motion.button>
  );
}
