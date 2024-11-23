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

// Adicione esta função de formatação
const formatNumber = (num: number, isWater: boolean = false): string => {
  if (isWater) {
    if (num > 10000) {
      return '10000+';
    }
    return num.toFixed(0);
  }

  // Para outros valores
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

// Adicione esta função de formatação para o grau 
const formatGrau = (grau: number): string => {
  if (grau >= 100) return "100";
  return grau.toFixed(2);
};

export default function CardSustentavel({
  energia,
  transporte,
  agua,
  data,
  grauSustentabilidade,
  emissaoEnergia,
  emissaoTransporte,
  emissaoAgua,
  combustivel,
}: CardSustavelProps) {
  const getBackgroundImage = (grau: number) => {
    if (grau >= 100) return "/assets/images/Card da Sustentabilidade 100.png";
    if (grau >= 75) return "/assets/images/Card da Sustentabilidade 75.png";
    if (grau >= 50) return "/assets/images/Card da Sustentabilidade 50.png";
    return "/assets/images/Card da Sustentabilidade 49.png";
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
            <span>{formatGrau(grauSustentabilidade)}%</span>
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
          <span className="text-gray-500">{formatNumber(emissaoEnergia)} co²</span>
        </div>
        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-gray-600">Transporte: {transporte}km {combustivel}</span>
          <span className="text-gray-500">{formatNumber(emissaoTransporte)} co²</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Água: {formatNumber(agua)}L</span>
          <span className="text-gray-500">{formatNumber(emissaoAgua)} co²</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
