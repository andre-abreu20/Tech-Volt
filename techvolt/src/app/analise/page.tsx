"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import { motion, AnimatePresence } from "framer-motion";
import Botao from "@/components/Botao/Botao";
import ProtectedRoute from "@/components/RotaProtegida/RotaProtegida";
import { toast } from "react-hot-toast";
import { FormErrors, FormData } from "@/types/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Analise() {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    energia: "",
    possui_veiculo: "",
    quilometros: "",
    tipo_combustivel: "",
    agua: "",
  });
  const router = useRouter();
  const { userEmail } = useAuth();  

  const backgrounds = {
    1: "/assets/images/Fundo Perguntas Analise Energia.png",
    2: "/assets/images/Fundo Perguntas Analise Gasolina.svg",
    3: "/assets/images/Fundo Perguntas Analise Gasolina.svg",
    4: "/assets/images/Fundo Perguntas Analise Gasolina.svg",
    5: "/assets/images/Fundo Perguntas Analise Agua.svg",
  };

  const questions = {
    1: "Quanto de Energia você utiliza por mês?",
    2: "Você possui um veículo próprio que utiliza gasolina, etanol ou diesel?",
    3: "Quantos quilômetros você percorre por mês?",
    4: "Qual o tipo do combustível?",
    5: "Quanto de Água você utiliza por mês?",
  };

  const placeholders = {
    1: "Em Kwh",
    2: "",
    3: "Em Km",
    4: "",
    5: "Em m³",
  };

  const validateField = (step: number, value: string): string => {
    switch (step) {
      case 1:
        if (!value) return "O consumo de energia é obrigatório";
        if (Number(value) <= 0) return "O consumo de energia deve ser maior que 0";
        break;
      case 2:
        if (!value) return "É necessário selecionar uma opção";
        break;
      case 3:
        if (!value) return "A quilometragem é obrigatória";
        if (Number(value) <= 0) return "A quilometragem deve ser maior que 0";
        break;
      case 4:
        if (!value) return "É necessário selecionar um tipo de combustível";
        break;
      case 5:
        if (!value) return "O consumo de água é obrigatório";
        if (Number(value) <= 0) return "O consumo de água deve ser maior que 0";
        break;
    }
    return "";
  };

  const handleNext = () => {
    const currentField = step === 1 ? "energia" 
      : step === 2 ? "possui_veiculo"
      : step === 3 ? "quilometros"
      : step === 4 ? "tipo_combustivel"
      : "agua";

    const error = validateField(step, formData[currentField as keyof FormData]);
    
    if (error) {
      setErrors({ ...errors, [currentField]: error });
      toast.error(error);
      return;
    }

    setErrors({});

    if (step === 2 && formData.possui_veiculo === "não") {
      setStep(5);
    } else if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step === 5 && formData.possui_veiculo === "não") {
      setStep(2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userEmail) {
        toast.error("Usuário não autenticado");
        return;
      }

      const responseEnergia = await fetch(`http://localhost:8080/usuario/energia/inserir/${userEmail}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          kwh: Number(formData.energia)
        }),
      });

      if (!responseEnergia.ok) {
        throw new Error(`Erro ao salvar dados de energia: ${responseEnergia.status}`);
      }

      if(formData.possui_veiculo === "sim"){
        const responseQuilometragem = await fetch(`http://localhost:8080/usuario/veiculo/inserir/${userEmail}`, {
          method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          distancia: Number(formData.quilometros),
          combustivel: formData.tipo_combustivel,
        }),
      });

      if (!responseEnergia.ok) {
        throw new Error(`Erro ao salvar dados de quilometragem: ${responseQuilometragem.status}`);
      }
      }
      // Requisição para inserir dados de água
      const responseAgua = await fetch(`http://localhost:8080/usuario/agua/inserir/${userEmail}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          quantidade: Number(formData.agua)
        }),
      });

      if (!responseAgua.ok) {
        throw new Error(`Erro ao salvar dados de água: ${responseAgua.status}`);
      }

      toast.success("Análise realizada com sucesso!");
      router.push("/analise/resultado");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      toast.error("Erro ao salvar análise: " + errorMessage);
    }
  };  

  const handleChange = (value: string) => {
    const fieldName = step === 1 ? "energia" 
      : step === 2 ? "possui_veiculo"
      : step === 3 ? "quilometros"
      : step === 4 ? "tipo_combustivel"
      : "agua";

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));

    if (step === 2) {
      if (value === "sim") {
        setStep(3);
      } else if (value === "não") {
        setStep(5);
      }
    }
  };

  const renderInput = () => {
    switch (step) {
      case 1:
      case 3:
      case 5:
        return (
          <Input
            label=""
            name={step === 1 ? "energia" : step === 3 ? "quilometros" : "agua"}
            value={formData[step === 1 ? "energia" : step === 3 ? "quilometros" : "agua"]}
            onChange={handleChange}
            placeholder={placeholders[step as keyof typeof placeholders]}
            type="number"
            error={errors[step === 1 ? "energia" : step === 3 ? "quilometros" : "agua"]}
          />
        );
      case 2:
        return (
          <div className="flex justify-center gap-4">
            <Botao
              onClick={() => handleChange("sim")}
              variant={formData.possui_veiculo === "sim" ? "default" : "white"}
            >
              Sim
            </Botao>
            <Botao
              onClick={() => handleChange("não")}
              variant={formData.possui_veiculo === "não" ? "default" : "white"}
            >
              Não
            </Botao>
          </div>
        );
      case 4:
        return (
          <div className="flex justify-center gap-4">
            <Botao
              onClick={() => handleChange("gasolina")}
              variant={formData.tipo_combustivel === "gasolina" ? "default" : "white"}
            >
              Gasolina
            </Botao>
            <Botao
              onClick={() => handleChange("etanol")}
              variant={formData.tipo_combustivel === "etanol" ? "default" : "white"}
            >
              Etanol
            </Botao>
            <Botao
              onClick={() => handleChange("diesel")}
              variant={formData.tipo_combustivel === "diesel" ? "default" : "white"}
            >
              Diesel
            </Botao>
          </div>
        );
    }
  };

  useEffect(() => {
    const verificarAnalise = async () => {
      try {
        if (!userEmail) {
          toast.error("Usuário não autenticado");
          router.push("/");
          return;
        }

        const response = await fetch(`http://localhost:8080/usuario/verifica/${userEmail}`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          toast.error("Você já realizou uma análise hoje. Tente novamente amanhã!");
          router.push("/");
        }
      } catch (error) {
        console.log(error)
      }
    };

    verificarAnalise();
  }, [userEmail, router]);

  return (
    <ProtectedRoute>
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
                {renderInput()}

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 md:mt-8">
                  {step > 1 && (
                    <Botao onClick={handlePrevious} variant="white" width="auto">
                      Voltar
                    </Botao>
                  )}
                  <Botao
                    onClick={handleNext}
                    variant={step === 5 ? "default" : "white"}
                    width="auto"
                  >
                    {step === 5 ? "Enviar" : "Próximo"}
                  </Botao>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ProtectedRoute>
  );
}
