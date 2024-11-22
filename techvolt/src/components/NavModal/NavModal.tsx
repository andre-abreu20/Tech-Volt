"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { Route } from "@/types/types";

export default function NavModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoutes, setCurrentRoutes] = useState<Route[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, } = useAuthContext();

  useEffect(() => {
    const routes = isAuthenticated ? privateRoutes : publicRoutes;
    setCurrentRoutes(routes);
  }, [isAuthenticated]);

  // Rotas com fundo escuro que precisam do ícone amarelo
  const darkBackgroundRoutes = [
    "/login",
    "/cadastro",
    "/integrantes",
  ];

  // Função para determinar qual ícone usar
  const getNavigationIcon = () => {
    if (isOpen) {
      return "/assets/images/Icone Navegacao Verde.svg";
    }
    
    if (darkBackgroundRoutes.includes(pathname)) {
      return "/assets/images/Icone Navegacao Amarelo Queimado.svg";
    }
    
    return "/assets/images/Icone Navegacao Verde.svg";
  };

  const publicRoutes = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "Cadastro", path: "/cadastro" },
    { name: "Integrantes", path: "/integrantes" },
  ];

  const privateRoutes = [
    { name: "Home", path: "/" },
    { name: "Análise", path: "/analise" },
    { name: "Perfil", path: "/perfil" },
    { name: "Integrantes", path: "/integrantes" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 md:p-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:scale-105 transition-transform"
      >
        <Image
          src={getNavigationIcon()}
          alt="Menu de Navegação"
          width={32}
          height={32}
          className="w-6 h-6 md:w-8 md:h-8"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="absolute right-4 md:right-8 top-16 md:top-24 backdrop-blur-md bg-black/30 rounded-xl overflow-hidden w-48 shadow-lg"
          >
            {currentRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleNavigation(route.path)}
                className="w-full px-4 py-3 text-center text-white font-semibold hover:bg-white/20 transition-colors"
              >
                {route.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
