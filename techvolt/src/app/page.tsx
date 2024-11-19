"use client";

import Input from "@/components/Input/Input";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const teste = () => {
    toast.success("CLICOUUU!");
  };

  return (
    <main>
      <button onClick={teste}>Clica</button>
      <form>
        <Input
          label="Nome"
          name="nome"
          value={formData.nome}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, nome: value }))
          }
          placeholder="Digite seu nome"
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          placeholder="Digite seu email"
        />
        <button type="submit">Enviar</button>
      </form>
      <h1>Home Page</h1>
    </main>
  );
}
