"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import { User } from "lucide-react";

export default function ResultadoAnalise() {
  const [resultado] = useState({
    nome: "JOÃO DE ABREU",
    energia: 100,
    transporte: 100,
    agua: 100,
    grauSustentabilidade: 80,
  });

  const getBackgroundImage = (grau: number) => {
    if (grau >= 100) return "/assets/images/Card da Sustentabilidade 100.svg";
    if (grau >= 75) return "/assets/images/Card da Sustentabilidade 75.svg";
    if (grau >= 50) return "/assets/images/Card da Sustentabilidade 50.svg";
    return "/assets/images/Card da Sustentabilidade 49.svg";
  };

  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#FDF7F2] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 auto-rows-min">
        {/* Coluna 1 - Nome e Sustentabilidade */}
        <div className="flex flex-col gap-6">
          {/* Card Nome */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-1 rounded-3xl p-6 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{resultado.nome}</h2>
          </motion.div>

          {/* Card Sustentabilidade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] rounded-3xl overflow-hidden relative"
          >
            <Image
              src={getBackgroundImage(resultado.grauSustentabilidade)}
              alt="Sustentabilidade"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-8xl font-bold">{resultado.grauSustentabilidade}%</span>
              <span className="text-3xl mt-2">SUSTENTÁVEL</span>
            </div>
          </motion.div>
        </div>

        {/* Coluna 2 - Energia e Emissão */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[2/1] rounded-3xl overflow-hidden relative"
          >
            <Image
              src="/assets/images/Resultado Analise Energia.svg"
              alt="Energia"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-6xl font-bold">{resultado.energia}</span>
              <span className="text-2xl">KWH</span>
              <span className="text-2xl">ENERGIA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[--blue-1] rounded-3xl p-6"
          >
            <div className="flex justify-between items-center text-white">
              <span className="text-xl">EMISSÃO</span>
              <span className="text-3xl font-bold">10 CO2</span>
            </div>
          </motion.div>
        </div>

        {/* Coluna 3 - Transporte, Água e Botão */}
        <div className="flex flex-col gap-6">
          {/* Card Transporte */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[2/1] rounded-3xl overflow-hidden relative"
          >
            <Image
              src="/assets/images/Resultado Analise Transporte.svg"
              alt="Transporte"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-6xl font-bold">{resultado.transporte}</span>
              <span className="text-2xl">KM</span>
              <span className="text-2xl">TRANSPORTE</span>
            </div>
          </motion.div>

          {/* Emissão Transporte */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[--orange] rounded-3xl p-6"
          >
            <div className="flex justify-between items-center text-white">
              <span className="text-xl">EMISSÃO</span>
              <span className="text-3xl font-bold">10 CO2</span>
            </div>
          </motion.div>

          {/* Card Água */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[2/1] rounded-3xl overflow-hidden relative"
          >
            <Image
              src="/assets/images/Resultado Analise Agua.svg"
              alt="Água"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-6xl font-bold">{resultado.agua}</span>
              <span className="text-2xl">L</span>
              <span className="text-2xl">ÁGUA</span>
            </div>
          </motion.div>

          {/* Emissão Água */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[--blue-2] rounded-3xl p-6"
          >
            <div className="flex justify-between items-center text-white">
              <span className="text-xl">EMISSÃO</span>
              <span className="text-3xl font-bold">10 CO2</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Botão Nova Consulta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8"
      >
        <Botao
          onClick={() => router.push("/analise")}
          variant="white"
        >
          NOVA CONSULTA
        </Botao>
      </motion.div>
    </div>
  );
}
