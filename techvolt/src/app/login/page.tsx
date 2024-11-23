"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { motion } from "framer-motion";
import Input from "@/components/Input/Input";
import toast from "react-hot-toast";
import Botao from "@/components/Botao/Botao";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login, checkAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuario/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.password,
        }),
      });

      if (response.status >= 200 && response.status < 300) {
        await login(formData.email);
        await checkAuth();
        toast.success("Login realizado com sucesso!");
        await new Promise(resolve => setTimeout(resolve, 0));
        router.push("/analise");
        return;
      }

      toast.error("Email ou senha incorretos");
    } catch (error) {
      console.log(error);
      toast.error("Email ou senha incorretos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    router.push("/cadastro");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <Image
        src="/assets/images/Fundo Login techVolt.png"
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
          <Botao
            type="submit"
            disabled={isLoading}
            width="auto"
            variant="default"
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Botao>
        </form>
      </motion.div>
    </div>
  );
}
