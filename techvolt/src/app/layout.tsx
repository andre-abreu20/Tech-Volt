import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavModal from "@/components/NavModal/NavModal";
import { AuthProvider } from "@/contexts/AuthContext";

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
    <html>
      <body>
        <AuthProvider>
          <div className="min-h-screen relative">
            <NavModal />
            {children}
          </div>
          <Toaster position="bottom-center" />
        </AuthProvider>
      </body>
    </html>
  );
}



