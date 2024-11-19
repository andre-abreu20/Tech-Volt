import { BotaoProps } from "@/types/types";
import { motion } from "framer-motion";

export default function Botao({
  children,
  type = "button",
  width = "full",
}: BotaoProps) {
  return (
    <div className="flex justify-center">
      <motion.button
        type={type}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          boxShadow: "0px 15px 20px rgba(90, 149, 94, 0.4)",
          background: "linear-gradient(135deg, var(--green-1), var(--green-3))",
        }}
        className={`w-${width} px-12 py-5 
                  text-xs font-semibold tracking-[2.5px] uppercase
                  text-white bg-green-1
                  rounded-[45px] shadow-lg
                  transition-all duration-300
                  hover:bg-green-3
                  focus:outline-none`}
      >
        {children}
      </motion.button>
    </div>
  );
}
