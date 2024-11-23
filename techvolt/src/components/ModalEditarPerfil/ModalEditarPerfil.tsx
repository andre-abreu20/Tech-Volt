import { useState } from "react";
import Input from "@/components/Input/Input";
import Botao from "@/components/Botao/Botao";
import { toast } from "react-hot-toast";
import { ModalEditarPerfilProps, UserData } from "@/types/types";
import { useAuth } from "@/hooks/useAuth";

export default function ModalEditarPerfil({ isOpen, onClose, userData, setUsuario }: ModalEditarPerfilProps) {
    const [formData, setFormData] = useState({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        confirmarSenha: "",
        dataNasc: userData.dataNasc,
        telefone: userData.telefone,
    });

    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        dataNasc: "",
        telefone: "",
    });
    const { updateAuthData } = useAuth();

    function validateField(name: string, value: string) {
        if (!value) return "Este campo é obrigatório";
        
        switch (name) {
        case "nome":
            if (value.length < 3) return "Nome deve ter pelo menos 3 caracteres";
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)) return "Nome deve conter apenas letras";
            break;
        case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
            break;
        case "senha":
            if (value.length < 8) return "Senha deve ter pelo menos 8 caracteres";
            if (!/(?=.*[A-Z])/.test(value)) return "Senha deve conter pelo menos uma letra maiúscula";
            if (!/(?=.*[0-9])/.test(value)) return "Senha deve conter pelo menos um número";
            break;
        case "confirmarSenha":
            if (value !== formData.senha) return "As senhas não coincidem";
            break;
        case "dataNasc":
            const hoje = new Date();
            const dataNascimento = new Date(value);
            const idade = hoje.getFullYear() - dataNascimento.getFullYear();
            if (idade < 18) return "Você deve ter pelo menos 18 anos";
            break;
        case "telefone":
            if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) return "Telefone inválido. Use o formato (00) 00000-0000";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {} as typeof errors;

        Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof typeof formData];
        if (!value && key !== "confirmarSenha") {
            hasErrors = true;
            newErrors[key as keyof typeof errors] = "Este campo é obrigatório";
        } else if (typeof value === "string") {
            const error = validateField(key, value);
            if (error) {
            hasErrors = true;
            newErrors[key as keyof typeof errors] = error;
            }
        }
        });

        setErrors(newErrors);

        if (hasErrors) {
        toast.error("Por favor, preencha todos os campos corretamente");
        return;
        }

        try {
        const dataToUpdate = {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            dataNasc: new Date(formData.dataNasc).toISOString().split('T')[0],
            telefone: formData.telefone.replace(/\D/g, ''),
        };

        const response = await fetch(`http://localhost:8080/usuario/alterar/${userData.email}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar dados");
        }

        setUsuario(dataToUpdate as UserData);
        localStorage.setItem('userEmail', dataToUpdate.email);
        updateAuthData(dataToUpdate.email);
        
        toast.success("Dados atualizados com sucesso!");
        onClose();
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
        } catch (error) {
        toast.error("Erro ao atualizar dados");
        console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[600px] m-auto max-h-[90vh] overflow-y-auto">
            <div className="p-6">
            <h2 className="text-2xl font-bold text-green-1 mb-4">Editar Perfil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={(value) => handleChange("nome", value)}
                error={errors.nome}
                />
                <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                error={errors.email}
                />
                <Input
                label="Nova Senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={(value) => handleChange("senha", value)}
                error={errors.senha}
                />
                {formData.senha && (
                <Input
                    label="Confirmar Nova Senha"
                    name="confirmarSenha"
                    type="password"
                    value={formData.confirmarSenha}
                    onChange={(value) => handleChange("confirmarSenha", value)}
                    error={errors.confirmarSenha}
                />
                )}
                <Input
                label="Data de Nascimento"
                name="dataNasc"
                type="date"
                value={formData.dataNasc}
                onChange={(value) => handleChange("dataNasc", value)}
                error={errors.dataNasc}
                />
                <Input
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={(value) => handleChange("telefone", value)}
                error={errors.telefone}
                />

                <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 md:justify-end mt-6">
                <Botao
                    variant="white"
                    onClick={onClose}
                >
                    Cancelar
                </Botao>
                <Botao
                    variant="default"
                    type="submit"
                >
                    Salvar Alterações
                </Botao>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}
