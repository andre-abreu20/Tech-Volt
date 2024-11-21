"use client";

import { motion } from "framer-motion";

export default function EsqueletoResultado() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-burnt-yellow p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl w-full">
        <div className="flex flex-col gap-4 md:gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-6 min-h-[120px] md:min-h-[150px] lg:h-[30%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[200px] md:min-h-[250px] lg:h-[70%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[50%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[50%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[50%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[50%] animate-pulse shadow-lg" />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 h-full">
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[35%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[180px] md:min-h-[200px] lg:h-[35%] animate-pulse shadow-lg" />
          <motion.div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl min-h-[60px] md:min-h-[80px] lg:h-[20%] animate-pulse shadow-lg" />
        </div>
      </div>
    </div>
  );
}
