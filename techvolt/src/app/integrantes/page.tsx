"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Integrantes() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/assets/images/Fundo Integrantes techVolt.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative container mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl italic md:text-5xl lg:text-7xl font-bold text-white text-center mb-10 md:mb-20"
        >
          INTEGRANTES DO PROJETO
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4 md:mb-6">
              <Image
                src="/assets/images/Imagem Integrante Andre.png"
                alt="André Luís"
                fill
                className="rounded-full object-cover border-4 border-green-1"
              />
            </div>

            <h2 className="text-3xl md:text-4xl text-green-1 font-semibold mb-1 md:mb-2">
              André Luís
            </h2>
            <p className="text-xl md:text-2xl text-green-1 mb-1 md:mb-2 font-bold">
              Turma: <span className="font-bold">1TDSPH</span>
            </p>
            <p className="text-xl md:text-2xl text-green-1 mb-4 md:mb-6 font-bold">
              RM: <span className="font-bold">558159</span>
            </p>

            <div className="flex gap-2 md:gap-4">
              <Link
                href="https://github.com/andre-abreu20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/images/Icone GitHub.svg"
                  alt="GitHub André"
                  width={30}
                  height={30}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/andrémesquita/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/images/Icone LinkedIn.svg"
                  alt="LinkedIn André"
                  width={30}
                  height={30}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4 md:mb-6">
              <Image
                src="/assets/images/Imagem Integrante Duda.png"
                alt="Maria Eduarda"
                fill
                className="rounded-full object-cover border-4 border-green-1"
              />
            </div>

            <h2 className="text-3xl md:text-4xl text-green-1 font-semibold mb-1 md:mb-2">
              Maria Eduarda
            </h2>
            <p className="text-xl md:text-2xl text-green-1 mb-1 md:mb-2 font-bold">
              Turma: <span className="font-bold">1TDSPH</span>
            </p>
            <p className="text-xl md:text-2xl text-green-1 mb-4 md:mb-6 font-bold">
              RM: <span className="font-bold">558575</span>
            </p>

            <div className="flex gap-2 md:gap-4">
              <Link
                href="https://github.com/dudabrigidio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/images/Icone GitHub.svg"
                  alt="GitHub Maria"
                  width={30}
                  height={30}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mbrigidio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/images/Icone LinkedIn.svg"
                  alt="LinkedIn Maria"
                  width={30}
                  height={30}
                  className="hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
