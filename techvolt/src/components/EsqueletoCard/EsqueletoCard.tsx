"use client";

export default function EsqueletoPerfil() {
  return (
    <div className="flex min-h-screen bg-burnt-yellow">
      <div className="flex flex-col items-center justify-center w-[320px] bg-burnt-yellow p-8 text-white"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full gap-8 p-4 md:p-8">
        <div className="w-4/5 h-16 bg-green-1/20 rounded-full animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className="w-full max-w-md rounded-3xl overflow-hidden shadow-lg animate-pulse"
            >
              <div className="relative h-48 bg-green-3" />

              <div className="bg-white p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-24 h-4 bg-green-1/20 rounded-full" />
                  <div className="w-16 h-4 bg-green-1/20 rounded-full" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-32 h-4 bg-green-1/20 rounded-full" />
                  <div className="w-16 h-4 bg-green-1/20 rounded-full" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-20 h-4 bg-green-1/20 rounded-full" />
                  <div className="w-16 h-4 bg-green-1/20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
