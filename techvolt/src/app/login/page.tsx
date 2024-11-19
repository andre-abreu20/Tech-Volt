"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Botao from "@/components/Botao/Botao";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
  };

  const handleRedirect = () => {
    router.push("/cadastro");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Image
        src="/assets/images/Fundo Login techVolt.svg"
        alt="Fundo de Login"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <h1 className="text-3xl font-bold text-white mb-8 z-10 italic tracking-wider">
        Login
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 p-8 bg-burnt-yellow rounded-2xl shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, email: value }))
            }
            placeholder="Digite seu email"
          />

          <Input
            label="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, password: value }))
            }
            placeholder="Digite sua senha"
          />
          <div className="flex flex-row justify-center w-full">
            <p>
              Ainda não tem uma
              <span
                onClick={handleRedirect}
                className="text-blue-2 underline font-bold cursor-pointer mx-1"
              >
                conta
              </span>
              ?
            </p>
          </div>
          <Botao type="submit" width="auto">
            Entrar
          </Botao>
        </form>
      </motion.div>
    </div>
  );
}
