import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Tech Volt",
  description:
    "Soluções e sistema visando a eficiência do uso energético e redução da emissão de CO2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
