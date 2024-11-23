export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: "text" | "email" | "password" | "date" | "tel" | "number";
  error?: string;
}

export interface BotaoProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  width?: string;
  variant?: "default" | "white";
  disabled?: boolean;
}

export interface UserData {
  nome: string;
  email: string;
  telefone: string;
  dataNasc: string;
  senha: string;
}

export interface CardSustavelProps {
  energia: number;
  transporte: number;
  agua: number;
  data: string;
  grauSustentabilidade: number;
  emissaoEnergia: number;
  emissaoTransporte: number;
  emissaoAgua: number;
  combustivel: string;
}

export interface ResultadoAnaliseData {
  nome: string;
  energia: number;
  transporte: number;
  agua: number;
  grauSustentabilidade: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  updateAuthData: (email: string) => void;
}

export interface Route {
  name: string;
  path: string;
}

export interface FormData {
  energia: string;
  possui_veiculo: string;
  quilometros: string;
  tipo_combustivel: string;
  agua: string;
}

export interface FormErrors {
  energia?: string;
  possui_veiculo?: string;
  quilometros?: string;
  tipo_combustivel?: string;
  agua?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface RelatorioData {
  energiaKwh: number;
  energiaEmissoes: number;
  quantidadeL: number;
  aguaEmissoes: number;
  distanciaKm: number;
  combustivel: string;
  veiculoEmissoes: number;
  grauSustentab: number;
  somaEmissao: number;
  data: string;
}

export interface ModalEditarPerfilProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    dataNasc: string;
  };
  setUsuario: (usuario: UserData) => void;
  setCurrentEmail: (email: string) => void;
}