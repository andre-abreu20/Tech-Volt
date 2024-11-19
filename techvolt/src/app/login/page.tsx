"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login aqui
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image
        src="/assets/images/Fundo Login techVolt.svg"
        alt="Fundo de Login"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 w-full h-full"
        priority
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-green-1 mb-8 text-center">
          Login
        </h1>

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
        </form>
      </motion.div>
    </div>
  );
}
