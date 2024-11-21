"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import EsqueletoResultado from "@/components/EsqueletoResultado/EsqueletoResultado";

export default function ResultadoAnalise() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const formatNumber = (value: number, maxDigits: number = 3) => {
    if (value >= Math.pow(10, maxDigits)) {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`;
      }
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
    }
    return value.toString();
  };

  const [resultado] = useState({
    nome: "JOÃO DE ABREU",
    energia: 100,
    transporte: 100,
    agua: 100,
    grauSustentabilidade: 100,
    co2Agua: 10,
    co2Energia: 10,
    co2Transporte: 10,
  });

  const getBackgroundImage = (grau: number) => {
    if (grau >= 100)
      return "/assets/images/Resultado Analise Sustentabilidade 100.svg";
    if (grau >= 75)
      return "/assets/images/Resultado Analise Sustentabilidade 75.svg";
    if (grau >= 50)
      return "/assets/images/Resultado Analise Sustentabilidade 50.svg";
    return "/assets/images/Resultado Analise Sustentabilidade 49.svg";
  };

  useEffect(() => {
    // Simula o carregamento dos dados
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <EsqueletoResultado />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-burnt-yellow p-8">
      <div className="grid grid-cols-4 gap-8 max-w-7xl w-full min-h-[60vh]">
        {/* Coluna 1: Perfil e Sustentabilidade */}
        <div className="flex flex-col gap-8 h-full">
          {/* Perfil */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-3 rounded-2xl p-6 h-[30%]"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <User className="w-12 h-12 text-white mb-2" />
              <h3 className="text-white text-xl font-bold text-center">
                {resultado.nome}
              </h3>
            </div>
          </motion.div>

          {/* Sustentabilidade - %*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden h-[70%]"
          >
            <Image
              src={getBackgroundImage(resultado.grauSustentabilidade)}
              alt="Card da Sustentabilidade"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-white">
              <span className="text-6xl font-bold">
                {Number(resultado.grauSustentabilidade)}%
              </span>
              <span className="text-2xl font-bold">SUSTENTÁVEL</span>
            </div>
          </motion.div>
        </div>

        {/* Coluna 2: Energia */}
        <div className="flex flex-col gap-8 h-full">
          {/* Energia */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden h-[50%]"
          >
            <Image
              src="/assets/images/Resultado Analise Energia.svg"
              alt="Energia Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.energia)}{" "}
                <span className="text-xl">KWH</span>
              </h3>
              <p className="text-xl">ENERGIA</p>
            </div>
          </motion.div>

          {/* Emissão Energia */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-1 rounded-2xl p-8 h-[50%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.co2Energia)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coluna 3: Transporte */}
        <div className="flex flex-col gap-8 h-full">
          {/* Transporte */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden h-[50%]"
          >
            <Image
              src="/assets/images/Resultado Analise Transporte.svg"
              alt="Transporte Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.transporte)}{" "}
                <span className="text-xl">KM</span>
              </h3>
              <p className="text-xl">TRANSPORTE</p>
            </div>
          </motion.div>

          {/* Emissão Transporte - 50% */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-orange rounded-2xl p-8 h-[50%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.co2Transporte)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coluna 4: Água */}
        <div className="flex flex-col gap-8 h-full">
          {/* Água */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden h-[40%]"
          >
            <Image
              src="/assets/images/Resultado Analise Agua.svg"
              alt="Água Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.agua)}{" "}
                <span className="text-xl">L</span>
              </h3>
              <p className="text-xl">ÁGUA</p>
            </div>
          </motion.div>

          {/* Emissão Água*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-2 rounded-2xl p-8 h-[40%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.co2Agua)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>

          {/* Nova Consulta*/}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full h-[15%] bg-gradient-to-b from-green-5 via-green-3 to-green-2 rounded-2xl p-6 text-white flex items-center justify-between"
            onClick={() => router.push("/analise")}
          >
            <span className="text-xl font-bold">NOVA CONSULTA</span>
            <Image
              src="/assets/images/icone seta para direita.svg"
              alt="Nova Consulta"
              width={32}
              height={32}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
