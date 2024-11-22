"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import Botao from "@/components/Botao/Botao";
import EsqueletoPerfil from "@/components/EsqueletoPerfil/EsqueletoPerfil";
import CardSustentavel from "@/components/CardSustentavel/CardSustentavel";
import { motion, AnimatePresence } from "framer-motion";
import { RelatorioData } from "@/types/types";
import EsqueletoCard from "@/components/EsqueletoCard/EsqueletoCard";
import Image from "next/image";
import ProtectedRoute from "@/components/RotaProtegida/RotaProtegida";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import ModalEditarPerfil from "@/components/ModalEditarPerfil/ModalEditarPerfil";

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout, checkAuth } = useAuth();
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    dataNasc: ""      
  });
  const { userEmail } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [relatorios, setRelatorios] = useState<RelatorioData[]>([]);
  const [loadingRelatorios, setLoadingRelatorios] = useState(true);
  const [currentEmail, setCurrentEmail] = useState(userEmail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailToUse = userEmail;
        if (!emailToUse) return;
        
        setLoading(true);
        const response = await fetch(`http://localhost:8080/usuario/${emailToUse}`);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar dados do usuário');
        }
        
        const data = await response.json();
        setUsuario(data);

        const relatoriosResponse = await fetch(`http://localhost:8080/usuario/relatorio/${emailToUse}`);
        
        if (!relatoriosResponse.ok) {
          throw new Error('Erro ao carregar histórico de análises');
        }
        
        const relatoriosData = await relatoriosResponse.json();
        const relatoriosAjustados = relatoriosData.map((relatorio: RelatorioData) => ({
          ...relatorio,
          data: new Date(new Date(relatorio.data).getTime() + 24 * 60 * 60 * 1000).toISOString()
        }));
        
        const relatoriosUnicos = relatoriosAjustados.filter((relatorio: RelatorioData, index: number, self: RelatorioData[]) =>
          index === self.findIndex((r) => new Date(r.data).getTime() === new Date(relatorio.data).getTime())
        );
        
        setRelatorios(relatoriosUnicos);
        
      } catch (error) {
        console.log(error)
        toast.error("Erro ao carregar dados");
      } finally {
        setLoading(false);
        setLoadingRelatorios(false);
      }
    };

    fetchData();

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [currentEmail, userEmail]);


  const handleLogout = async () => {
    try {
      await logout();
      await checkAuth();
      toast.success("Logout realizado com sucesso!");
      await new Promise(resolve => setTimeout(resolve, 0));
      router.push("/login");
    } catch (error) {
      console.log(error)
      toast.error("Erro ao realizar logout");
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!userEmail) return;
      
      const response = await fetch(`http://localhost:8080/usuario/excluir/${userEmail}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }

      toast.success("Conta deletada com sucesso!");
      await logout();
      router.push("/login");
    } catch (error) {
      toast.error("Erro ao deletar conta");
      console.error(error);
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

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
                  {usuario?.nome}
                </h1>

                <div className="flex flex-col justify-start gap-3 w-full">
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Email:</span>
                      <span className="truncate" title={usuario?.email}>
                        {usuario?.email}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Telefone:</span>
                      <span className="truncate" title={usuario?.telefone}>
                        {usuario?.telefone}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Data de Nascimento:</span>
                      <span
                        className="truncate"
                        title={usuario?.dataNasc}
                      >
                        {usuario?.dataNasc}
                      </span>
                    </div>

                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Senha:</span>
                      <div className="flex items-center gap-2">
                        <span className="truncate">
                          {showPassword ? usuario?.senha : "********"}
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
                    <Botao 
                      variant="white" 
                      width="200px"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      ALTERAR DADOS
                    </Botao>

                    <Botao variant="white" width="200px" onClick={handleLogout}>
                      SAIR
                    </Botao>
                  </div>

                  <Botao 
                    variant="white" 
                    width="200px" 
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
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

          {loadingRelatorios ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {[1, 2, 3, 4].map((_, index) => (
                <EsqueletoCard key={index} />
              ))}
            </div>
          ) : relatorios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {relatorios.map((relatorio, index) => {
                return (
                  <CardSustentavel
                    key={index}
                    energia={relatorio.energiaKwh}
                    agua={relatorio.quantidadeL}
                    transporte={relatorio.distanciaKm}
                    combustivel={relatorio.combustivel}
                    data={formatarData(relatorio.data)}
                    grauSustentabilidade={relatorio.grauSustentab}
                    emissaoEnergia={relatorio.energiaEmissoes}
                    emissaoTransporte={relatorio.veiculoEmissoes}
                    emissaoAgua={relatorio.aguaEmissoes}
                  />
                );
              })}
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

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      />

      <ModalEditarPerfil
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={usuario}
        setUsuario={setUsuario}
        setCurrentEmail={setCurrentEmail}
      />
    </ProtectedRoute>
  );
}
