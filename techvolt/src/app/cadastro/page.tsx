"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Botao from "@/components/Botao/Botao";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    data_nascimento: "",
    telefone: "",
    aceitarTermos: false,
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    data_nascimento: "",
    telefone: "",
  });

  function validateField(name: string, value: string) {
    switch (name) {
      case "nome":
        if (value.length < 3) {
          return "Nome deve ter pelo menos 3 caracteres";
        }
        if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) {
          return "Nome deve conter apenas letras";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Email inválido";
        }
        break;
      case "senha":
        if (value.length < 8) {
          return "Senha deve ter pelo menos 8 caracteres";
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return "Senha deve conter pelo menos uma letra maiúscula";
        }
        if (!/(?=.*[0-9])/.test(value)) {
          return "Senha deve conter pelo menos um número";
        }
        break;
      case "confirmarSenha":
        if (value !== formData.senha) {
          return "As senhas não coincidem";
        }
        break;
      case "data_nascimento":
        const hoje = new Date();
        const dataNascimento = new Date(value);
        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        if (idade < 18) {
          return "Você deve ter pelo menos 18 anos";
        }
        break;
      case "telefone":
        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) {
          return "Telefone inválido. Use o formato (00) 00000-0000";
        }
        break;
    }
    return "";
  }

  const handleChange = (name: string, value: string) => {
    if (name === "telefone") {
      value = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "senha") {
      const confirmarSenhaError = formData.confirmarSenha
        ? validateField("confirmarSenha", formData.confirmarSenha)
        : "";
      setErrors((prev) => ({ ...prev, confirmarSenha: confirmarSenhaError }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {} as typeof errors;

    Object.keys(formData).forEach((key) => {
      if (key === "aceitarTermos") return;
      const value = formData[key as keyof typeof formData];
      if (typeof value === "string") {
        const error = validateField(key, value);
        if (error) {
          hasErrors = true;
          newErrors[key as keyof typeof errors] = error;
        }
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    if (!formData.aceitarTermos) {
      toast.error("Você precisa aceitar os termos de uso para continuar");
      return;
    }
    toast.success("Formulário válido! Prosseguindo com o cadastro...");
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-center relative px-4 md:px-8 lg:px-16">
      <Image
        src="/assets/images/Fundo Cadastro techVolt.png"
        alt="Fundo de Cadastro"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="max-w-[1440px] mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-8 z-10 relative italic tracking-wider">
          Registre-se
        </h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md p-8 bg-burnt-yellow rounded-2xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={(value) => handleChange("nome", value)}
              placeholder="Digite seu nome completo"
              error={errors.nome}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="Digite seu email"
              error={errors.email}
            />

            <Input
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={(value) => handleChange("senha", value)}
              placeholder="Digite sua senha"
              error={errors.senha}
            />

            <Input
              label="Confirmar Senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={(value) => handleChange("confirmarSenha", value)}
              placeholder="Confirme sua senha"
              error={errors.confirmarSenha}
            />

            <Input
              label="Data de Nascimento"
              name="data_nascimento"
              type="date"
              value={formData.data_nascimento}
              onChange={(value) => handleChange("data_nascimento", value)}
              error={errors.data_nascimento}
            />

            <Input
              label="Telefone"
              name="telefone"
              type="tel"
              value={formData.telefone}
              onChange={(value) => handleChange("telefone", value)}
              placeholder="(00) 00000-0000"
              error={errors.telefone}
            />

            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                id="termos"
                checked={formData.aceitarTermos}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    aceitarTermos: e.target.checked,
                  }))
                }
                className="mt-1 w-4 h-4 text-green-1 border-gray-300 rounded 
                         focus:ring-green-2 cursor-pointer"
              />
              <label htmlFor="termos" className="text-sm text-gray-700">
                Li e aceito os{" "}
                <a
                  href="/termos-de-uso"
                  target="_blank"
                  className="text-blue-2 underline font-semibold hover:text-blue-1"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Em breve: Termos de Uso");
                  }}
                >
                  termos de uso
                </a>{" "}
                e{" "}
                <a
                  href="/politica-privacidade"
                  target="_blank"
                  className="text-blue-2 underline font-semibold hover:text-blue-1"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.success("Em breve: Política de Privacidade");
                  }}
                >
                  política de privacidade
                </a>
              </label>
            </div>

            <div className="flex flex-row justify-center w-full">
              <p>
                Já tem uma
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
              Cadastrar
            </Botao>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
