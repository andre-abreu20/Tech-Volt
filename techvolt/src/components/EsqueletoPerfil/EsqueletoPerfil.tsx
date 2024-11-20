"use client";

export default function EsqueletoPerfil() {
  return (
    <div className="flex min-h-screen bg-burnt-yellow">
      <div className="flex flex-col items-center justify-center w-[320px] bg-green-1 p-8 text-white">
        <div className="flex flex-col items-center gap-6 w-full animate-pulse">
          <div className="w-32 h-32 bg-white rounded-full shrink-0" />

          <div className="w-4/5 h-8 bg-white rounded-full" />

          <div className="flex flex-col justify-start gap-3 w-full">
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex flex-col gap-1">
                <div className="w-20 h-4 bg-white rounded-full" />
                <div className="w-full h-4 bg-white rounded-full" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="w-24 h-4 bg-white rounded-full" />
                <div className="w-full h-4 bg-white rounded-full" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="w-40 h-4 bg-white rounded-full" />
                <div className="w-full h-4 bg-white rounded-full" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="w-16 h-4 bg-white rounded-full" />
                <div className="w-full h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full mt-8">
            <div className="flex flex-col items-center gap-4 mb-32">
              <div className="w-[200px] h-14 bg-white rounded-[45px]" />
              <div className="w-[200px] h-14 bg-white rounded-[45px]" />
            </div>
            <div className="w-[200px] h-14 bg-white rounded-[45px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
