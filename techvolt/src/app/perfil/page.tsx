"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import Botao from "@/components/Botao/Botao";
import EsqueletoPerfil from "@/components/EsqueletoPerfil/EsqueletoPerfil";
import CardSustentavel from "@/components/CardSustentavel/CardSustentavel";
import { motion, AnimatePresence } from "framer-motion";
import { CardSustavelProps, UserData } from "@/types/types";
import EsqueletoCard from "@/components/EsqueletoCard/EsqueletoCard";
import Image from "next/image";
import ProtectedRoute from "@/components/RotaProtegida/RotaProtegida";

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUserData({
        nome: "JOAO DE ABREU",
        email: "joao@email.com",
        telefone: "11974638391",
        dataNascimento: "12/03/2002",
        senha: "12345678",
      });
      setLoading(false);
    }, 2000);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const dadosTeste: CardSustavelProps[] = [
    {
      energia: 100,
      transporte: 95,
      agua: 98,
      data: "23/01/2024",
      grauSustentabilidade: 100, // Card 100%
    },
    {
      energia: 80,
      transporte: 75,
      agua: 85,
      data: "22/01/2024",
      grauSustentabilidade: 80, // Card 75%
    },
    {
      energia: 55,
      transporte: 60,
      agua: 50,
      data: "21/01/2024",
      grauSustentabilidade: 55, // Card 50%
    },
    {
      energia: 30,
      transporte: 25,
      agua: 35,
      data: "20/01/2024",
      grauSustentabilidade: 30, // Card -50%
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-burnt-yellow">
        <EsqueletoPerfil />
        <EsqueletoCard />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-burnt-yellow">
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed top-4 left-4 z-50 w-12 h-12 bg-green-1 rounded-full flex items-center justify-center md:hidden"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        )}

        <AnimatePresence>
          {(isMenuOpen || window.innerWidth > 768) && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed md:relative z-40 flex flex-col items-center w-[320px] bg-green-1 p-8 text-white min-h-screen"
            >
              <div className="flex flex-col items-center gap-6 w-full mt-8">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shrink-0">
                  <User className="w-20 h-20 text-green-1" />
                </div>

                <h1 className="text-2xl font-bold text-center break-words w-full">
                  {userData?.nome}
                </h1>

                <div className="flex flex-col justify-start gap-3 w-full">
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Email:</span>
                      <span className="truncate" title={userData?.email}>
                        {userData?.email}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Telefone:</span>
                      <span className="truncate" title={userData?.telefone}>
                        {userData?.telefone}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Data de Nascimento:</span>
                      <span
                        className="truncate"
                        title={userData?.dataNascimento}
                      >
                        {userData?.dataNascimento}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Senha:</span>
                      <div className="flex items-center gap-2">
                        <span className="truncate">
                          {showPassword ? userData?.senha : "********"}
                        </span>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="shrink-0"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-col items-center gap-4 mb-32">
                    <Botao variant="white" width="200px">
                      ALTERAR DADOS
                    </Botao>

                    <Botao variant="white" width="200px">
                      SAIR
                    </Botao>
                  </div>

                  <Botao variant="white" width="200px">
                    APAGAR CONTA
                  </Botao>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
          )}
        </AnimatePresence>

        <div className="w-full min-h-screen p-4 md:p-8">
          <h1 className="text-5xl italic font-bold text-green-1 text-center break-words w-full mb-8">
            Histórico de Análises
          </h1>

          {dadosTeste.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {dadosTeste.map((dados, index) => (
                <CardSustentavel key={index} {...dados} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
              <Image
                src="/assets/images/Sem registro.svg"
                alt="Nenhum registro encontrado"
                width={400}
                height={400}
                className="mb-4"
              />
              <span className="text-2xl font-light text-gray-400 text-center">
                Você ainda não possui análises {":)"}
              </span>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
