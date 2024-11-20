"use client";
import { useMemo } from "react";
import { CardSustavelProps } from "@/types/types";
import Image from "next/image";
import { motion } from "framer-motion";

const mesesPorExtenso = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CardSustentavel({
  energia,
  transporte,
  agua,
  data,
  grauSustentabilidade,
}: CardSustavelProps) {
  const getBackgroundImage = (grau: number) => {
    if (grau >= 100) return "/assets/images/Card da Sustentabilidade 100.svg";
    if (grau >= 75) return "/assets/images/Card da Sustentabilidade 75.svg";
    if (grau >= 50) return "/assets/images/Card da Sustentabilidade 50.svg";
    return "/assets/images/Card da Sustentabilidade 49.svg";
  };

  const dataFormatada = useMemo(() => {
    const [dia, mes, ano] = data.split("/");
    return `${dia} de ${mesesPorExtenso[parseInt(mes) - 1]} ${ano}`;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="w-full max-w-sm rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-white"
    >
      <div className="relative h-80">
        <Image
          src={getBackgroundImage(grauSustentabilidade)}
          alt="Card da Sustentabilidade"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 flex flex-col h-full justify-between p-6 text-white">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center text-4xl font-bold"
          >
            <span>{grauSustentabilidade}%</span>
            <span className="ml-4 text-2xl">Sustentável</span>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl italic font-semibold"
          >
            {dataFormatada}
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-8 space-y-6"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Energia: {energia} KWH</span>
          <span className="text-gray-500">{10} co²</span>
        </div>
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Transporte: {transporte}km Gasolina</span>
          <span className="text-gray-500">{10} co²</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Água: {agua}L</span>
          <span className="text-gray-500">{10} co²</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
