export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: "text" | "email" | "password" | "date" | "tel";
  error?: string;
}

export interface BotaoProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  width?: string;
  variant?: "default" | "white";
}

export interface UserData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
}

export interface CardSustavelProps {
  energia: number;
  transporte: number;
  agua: number;
  data: string;
  grauSustentabilidade: number;
}
