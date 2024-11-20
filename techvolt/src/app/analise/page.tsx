"use client";

import { useState } from "react";
import Input from "@/components/Input/Input";
import { motion, AnimatePresence } from "framer-motion";
import Botao from "@/components/Botao/Botao";

interface FormData {
  energia: string;
  gasolina: string;
  agua: string;
}

export default function Analise() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    energia: "",
    gasolina: "",
    agua: "",
  });

  const backgrounds = {
    1: "/assets/images/Fundo Perguntas Analise Energia.svg",
    2: "/assets/images/Fundo Perguntas Analise Gasolina.svg",
    3: "/assets/images/Fundo Perguntas Analise Agua.svg",
  };

  const questions = {
    1: "Quanto de Energia você utiliza por mês?",
    2: "Quanto de Gasolina em transporte você utiliza por mês?",
    3: "Quanto de Água você utiliza por mês?",
  };

  const placeholders = {
    1: "Em Kwh",
    2: "Em Litros",
    3: "Em m³",
  };

  const handleNext = () => {
    console.log("Próximo clicado, step atual:", step);
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    console.log("Voltar clicado, step atual:", step);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Dados finais:", formData);
    // Aqui você implementa a lógica para enviar os dados
  };

  const handleChange = (value: string) => {
    const fieldName = step === 1 ? "energia" : step === 2 ? "gasolina" : "agua";
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgrounds[step as keyof typeof backgrounds]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-4xl p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 md:gap-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-bold text-green-1 text-center mb-4 md:mb-8 px-4"
            >
              {questions[step as keyof typeof questions]}
            </motion.h1>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8">
              <Input
                label=""
                name={step === 1 ? "energia" : step === 2 ? "gasolina" : "agua"}
                value={formData[step === 1 ? "energia" : step === 2 ? "gasolina" : "agua"]}
                onChange={handleChange}
                placeholder={placeholders[step as keyof typeof placeholders]}
                type="number"
              />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 md:mt-8">
                {step > 1 && (
                  <Botao onClick={handlePrevious} variant="white" width="auto">
                    Voltar
                  </Botao>
                )}
                <Botao
                  onClick={handleNext}
                  variant={step === 3 ? "default" : "white"}
                  width="auto"
                >
                  {step === 3 ? "Enviar" : "Próximo"}
                </Botao>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
