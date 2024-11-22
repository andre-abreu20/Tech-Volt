"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import EsqueletoResultado from "@/components/EsqueletoResultado/EsqueletoResultado";
import ProtectedRoute from "@/components/RotaProtegida/RotaProtegida";
import { useAuth } from "@/hooks/useAuth";

export default function ResultadoAnalise() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userEmail, isAuthenticated, isLoading } = useAuth();
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

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    dataNasc: ""  
  });

  const [resultado, setResultado] = useState({
    energiaKwh: 0,
    energiaEmissoes: 0,
    quantidadeL: 0,
    aguaEmissoes: 0,
    distanciaKm: 0,
    combustivel: "",
    veiculoEmissoes: 0,
    grauSustentab: 0,
    somaEmissao: 0,
    data: ""
  });

  const getBackgroundImage = (grau: number) => {
    if (grau >= 100)
      return "/assets/images/Resultado Analise Sustentabilidade 100.png";
    if (grau >= 75)
      return "/assets/images/Resultado Analise Sustentabilidade 75.png";
    if (grau >= 50)
      return "/assets/images/Resultado Analise Sustentabilidade 50.png";
    return "/assets/images/Resultado Analise Sustentabilidade 49.png";
  };

  const formatGrau = (grau: number): string => {
    if (grau >= 100) return "100";
    return grau.toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userEmail) {
          return;
        }

        const responseGrau = await fetch(`http://localhost:8080/usuario/grau/inserir/${userEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}),
        });

        if (!responseGrau.ok) {
          throw new Error('Erro ao calcular grau de sustentabilidade');
        }

        setLoading(true);

        const response = await fetch(`http://localhost:8080/usuario/${userEmail}`, {
          method: "GET",
          mode: "cors"
        });

        if(response.ok){
          const data = await response.json();
          setUsuario({...data});
        }
        
        const responseResultado = await fetch(`http://localhost:8080/usuario/calculo/${userEmail}`, {
          method: "GET",
          mode: "cors"
        });

        if(responseResultado.ok){
          const data = await responseResultado.json();
          console.log(data)
          setResultado({...data});
        } 
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (!isLoading) {
      fetchData();
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [userEmail, isAuthenticated, isLoading]);

  if (loading) {
    return <EsqueletoResultado />;
  }

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen w-full bg-burnt-yellow p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl w-full">
        {/* Coluna 1: Perfil e Sustentabilidade */}
        <div className="flex flex-col gap-4 md:gap-8">
          {/* Perfil */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-3 rounded-2xl p-6 min-h-[120px] md:min-h-[150px] lg:min-h-[30%]"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <User className="w-12 h-12 text-white mb-2" />
              <h3 className="text-white text-xl font-bold text-center">
                {usuario.nome}
              </h3>
            </div>
          </motion.div>

          {/* Sustentabilidade - %*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden min-h-[200px] md:min-h-[250px] lg:min-h-[70%]"
          >
            <Image
              src={getBackgroundImage((resultado.grauSustentab))}
              alt="Card da Sustentabilidade"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-white">
              <span className="text-6xl font-bold">
                {formatGrau(resultado.grauSustentab)}%
              </span>
              <span className="text-2xl font-bold">SUSTENTÁVEL</span>
            </div>
          </motion.div>
        </div>

        {/* Coluna 2: Energia */}
        <div className="flex flex-col gap-4 md:gap-8">
          {/* Energia */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden min-h-[180px] md:min-h-[200px] lg:min-h-[50%]"
          >
            <Image
              src="/assets/images/Resultado Analise Energia.png"
              alt="Energia Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.energiaKwh)}{" "}
                <span className="text-xl">KWH</span>
              </h3>
              <p className="text-xl">ENERGIA</p>
            </div>
          </motion.div>

          {/* Emissão Energia */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-1 rounded-2xl p-6 md:p-8 min-h-[180px] md:min-h-[200px] lg:min-h-[50%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.energiaEmissoes)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coluna 3: Transporte */}
        <div className="flex flex-col gap-4 md:gap-8">
          {/* Transporte */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden min-h-[180px] md:min-h-[200px] lg:min-h-[50%]"
          >
            <Image
              src="/assets/images/Resultado Analise Transporte.png"
              alt="Transporte Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.distanciaKm)}{" "}
                <span className="text-xl">KM</span>
              </h3>
              <p className="text-xl">TRANSPORTE</p>
            </div>
          </motion.div>

          {/* Emissão Transporte*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-orange rounded-2xl p-6 md:p-8 min-h-[180px] md:min-h-[200px] lg:min-h-[50%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.veiculoEmissoes)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Coluna 4: Água */}
        <div className="flex flex-col gap-4 md:gap-8 h-full">
          {/* Água */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden min-h-[180px] md:min-h-[200px] lg:min-h-[35%]"
          >
            <Image
              src="/assets/images/Resultado Analise Agua.png"
              alt="Água Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-4xl font-bold">
                {formatNumber(resultado.quantidadeL)}{" "}
                <span className="text-xl">L</span>
              </h3>
              <p className="text-xl">ÁGUA</p>
            </div>
          </motion.div>

          {/* Emissão Água*/}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-2 rounded-2xl p-6 md:p-8 min-h-[180px] md:min-h-[200px] lg:min-h-[35%] flex flex-col justify-between"
          >
            <div className="text-white font-bold flex flex-col h-full justify-between">
              <p className="text-3xl">EMISSÃO</p>
              <p className="text-7xl">
                {formatNumber(resultado.aguaEmissoes)}{" "}
                <span className="text-3xl">CO2</span>
              </p>
            </div>
          </motion.div>

          {/* Nova Consulta*/}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full min-h-[60px] md:min-h-[80px] lg:min-h-[25.5%] bg-gradient-to-b from-green-5 via-green-3 to-green-2 rounded-2xl p-6 text-white flex items-center justify-between mt-auto"
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
    </ProtectedRoute>
  );
}
