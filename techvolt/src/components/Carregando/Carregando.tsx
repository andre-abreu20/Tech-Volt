"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-[250px] h-[250px] p-[15px] flex items-center justify-center relative">
        {/* Nuvem frontal */}
        <div className="w-[250px] absolute">
          <div className="pt-[45px] ml-[25px] inline-block absolute z-[1] animate-clouds-front">
            <div className="flex">
              <div className="w-[65px] h-[65px] rounded-full bg-[#4c9beb] inline-block" />
              <div className="w-[45px] h-[45px] rounded-full bg-[#4c9beb] inline-block -ml-[25px]" />
            </div>
          </div>
        </div>

        {/* Nuvem traseira */}
        <div className="w-[250px] absolute"></div>
        <div className="-mt-[30px] ml-[150px] inline-block absolute z-[1] animate-clouds-back">
          <div className="flex">
            <div className="w-[30px] h-[30px] rounded-full bg-[#4c9beb] inline-block" />
            <div className="w-[50px] h-[50px] rounded-full bg-[#4c9beb] inline-block -ml-[20px]" />
          </div>
        </div>
      </div>

      {/* Sol com animação de brilho */}
      <div className="w-[120px] h-[120px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-full inline-block absolute z-[2] animate-sunshine" />
    </div>
  );
}
