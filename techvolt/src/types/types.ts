export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  type?: "text" | "email" | "password";
}

export interface BotaoProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  width?: string;
}
