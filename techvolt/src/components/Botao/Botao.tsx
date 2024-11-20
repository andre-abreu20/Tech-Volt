import { BotaoProps } from "@/types/types";
import { motion } from "framer-motion";

export default function Botao({
  children,
  type = "button",
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
    <div className="flex justify-center">
      <motion.button
        type={type}
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
        whileHover={hoverEffect[variant as keyof typeof hoverEffect]}
        className={`w-${width} px-12 py-5 
                  text-xs font-semibold tracking-[2.5px] uppercase
                  ${variants[variant as keyof typeof variants]}
                  rounded-[45px] shadow-lg
                  transition-all duration-300
                  focus:outline-none`}
      >
        {children}
      </motion.button>
    </div>
  );
}
