"use client";

import { motion } from "framer-motion";

export default function EsqueletoResultado() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-burnt-yellow p-8">
      <div className="grid grid-cols-4 gap-8 max-w-7xl w-full min-h-[60vh]">
        <div className="flex flex-col gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-6 h-[30%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[70%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[50%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[50%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[50%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[50%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[40%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[40%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl h-[20%] animate-pulse shadow-lg" />
        </div>
      </div>
    </div>
  );
}
