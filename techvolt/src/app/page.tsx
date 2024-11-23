"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative">
      <section className="relative min-h-screen">
        <Image
          src="/assets/images/Fundo Home.png"
          alt="Fundo sustentável com lâmpada"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />

        <div className="relative z-30 flex flex-col min-h-screen">
          <nav className="flex justify-between items-center p-4 md:p-8">
            <Image
              src="/assets/images/Logo TechVolt.svg"
              alt="Logo TechVolt"
              width={120}
              height={40}
              className="w-[50px] sm:w-[80px] md:w-[120px] h-auto"
            />
          </nav>

          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-20">
            <h1 className="text-white text-2xl sm:text-4xl md:text-7xl font-light max-w-[700px] leading-tight">
              Cuidar do planeta é cuidar de{" "}
              <span className="font-bold">todos</span>.
            </h1>
          </div>
        </div>
      </section>

      {/* Seção de riscos climáticos */}
      <section className="px-6 md:px-20 py-12 md:py-24 bg-burnt-yellow">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-7xl mx-auto">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-green-2 mb-6 md:mb-8">
              O futuro do planeta está em nossas mãos:
              <span className="block text-2xl md:text-4xl mt-4">
                você conhece os riscos climáticos que enfrentamos?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-green-2 leading-relaxed">
              As{" "}
              <span className="font-semibold">
                emissões de gases de efeito estufa
              </span>{" "}
              provenientes da queima de combustíveis fósseis retêm o calor
              irradiado pela superfície terrestre, intensificando o efeito
              estufa natural. Como resultado, ocorre o aquecimento global, o que
              leva a diversos problemas climáticos.
            </p>
          </div>

          <div className="flex-1">
            <Image
              src="/assets/images/Imagem Terra Pegando Fogo.png"
              alt="Terra em chamas representando o aquecimento global"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Seção de problemas do aquecimento global */}
      <section className="bg-burnt-yellow px-4 sm:px-8 md:px-20 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-green-2 text-center mb-12 md:mb-20">
            Esses são alguns dos problemas causados pelo aquecimento global
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="rounded-3xl overflow-hidden mb-4 md:mb-6">
                <Image
                  src="/assets/images/Imagem Urso Polar.png"
                  alt="Urso polar em geleira derretendo"
                  width={400}
                  height={400}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl text-green-2 text-center font-light">
                Derretimento de geleiras
              </span>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="rounded-3xl overflow-hidden mb-4 md:mb-6">
                <Image
                  src="/assets/images/Imagem Floresta Pegando Fogo.png"
                  alt="Incêndio florestal"
                  width={400}
                  height={400}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl text-green-2 text-center font-light">
                Incêndios florestais
              </span>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <div className="rounded-3xl overflow-hidden mb-4 md:mb-6">
                <Image
                  src="/assets/images/Imagem Gelo Descongelando.png"
                  alt="Geleiras derretendo e aumentando nível do mar"
                  width={400}
                  height={400}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl text-green-2 text-center font-light">
                Aumento do nível do mar
              </span>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center">
              <div className="rounded-3xl overflow-hidden mb-4 md:mb-6">
                <Image
                  src="/assets/images/Imagem Arvore Seca.png"
                  alt="Terra seca representando ondas de calor"
                  width={400}
                  height={400}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />
              </div>
              <span className="text-xl md:text-2xl text-green-2 text-center font-light">
                Extremas ondas de calor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção sobre emissão de CO2 */}
      <section className="bg-green-2 px-4 md:px-20 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="w-full md:w-1/3">
              <Image
                src="/assets/images/Imagem Lampada Acesa.png"
                alt="Lâmpada acesa representando consumo de energia"
                width={400}
                height={400}
                className="w-full h-auto max-w-[300px] mx-auto md:max-w-none"
              />
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-2xl md:text-5xl font-light text-white leading-relaxed">
                Atualmente, a principal fonte de emissão de CO2 no mundo é a
                queima de combustíveis fósseis para geração de energia, e isso
                vem gerando vários problemas em nosso planeta.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Nova seção sobre a TechVolt */}
      <section className="bg-burnt-yellow px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-16">
            {/* Logo */}
            <div className="w-full md:w-[400px]">
              <Image
                src="/assets/images/Logo TechVolt Verde.png"
                alt="Logo TechVolt"
                width={400}
                height={150}
                className="w-full h-auto max-w-[280px] md:max-w-full mx-auto"
              />
            </div>
            {/* Texto descritivo */}
            <p className="text-2xl text-green-2 text-center leading-relaxed max-w-[1200px]">
              Somos uma empresa de redução do consumo energético e emissão de
              CO2, atuamos no setor de eficiência energtica, desenvolvendo
              tecnologias, produtos e serviços que buscam reduzir o consumo de
              energia e os custos, abrindo caminho para modelos de geração e
              consumo de energia.
            </p>
          </div>
        </div>
      </section>

      {/* Seção dos sistemas principais */}
      <section className="bg-burnt-yellow px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-green-2 text-center mb-20">
            Esses são os nossos 3 sistemas principais
          </h2>

          {/* Sistema 1 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mb-12 md:mb-20 bg-green-2 p-8 md:p-16 rounded-3xl">
            <div className="w-full md:w-1/3">
              <Image
                src="/assets/images/Imagem Termoestato.png"
                alt="Termoestato"
                width={400}
                height={400}
                className="w-full h-auto rounded-full"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Sensores de presença e temperatura
              </h3>
              <p className="text-2xl text-white leading-relaxed">
                Sensores que ajustam o uso de energia em tempo real, desligando
                luzes e sistemas de aquecimento ou resfriamento em áreas
                desocupadas
              </p>
            </div>
          </div>

          {/* Sistema 2 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mb-12 md:mb-20 bg-burnt-yellow p-8 md:p-16 rounded-3xl">
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl md:text-5xl font-bold text-green-2 mb-4 md:mb-6">
                Sistemas baseados em IA
              </h3>
              <p className="text-2xl text-green-2 leading-relaxed">
                Sensores que analisam padrões de consumo e aprendem a ajustar
                automaticamente o uso de energia, considerando fatores como
                horários de pico, previsão do tempo e ocupação dos ambientes
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <Image
                src="/assets/images/Imagem de Celular.png"
                alt="Sistema de IA"
                width={400}
                height={400}
                className="w-full h-auto rounded-full"
              />
            </div>
          </div>

          {/* Sistema 3 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 bg-green-2 p-8 md:p-16 rounded-3xl">
            <div className="w-full md:w-1/3">
              <Image
                src="/assets/images/Imagem de Paines e Turbinas.png"
                alt="Energia renovável"
                width={400}
                height={400}
                className="w-full h-auto rounded-full"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Sistemas de energia renovável
              </h3>
              <p className="text-2xl text-white leading-relaxed">
                Nossos cliente podem optar pela instalação de nossos sistemas
                renováveis (como painéis solares e turbinas aeólicas),
                otimizando ainda mais seu consumo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção da calculadora */}
      <section className="bg-burnt-yellow px-4 sm:px-8 md:px-20 py-12 md:py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/3">
            <Image
              src="/assets/images/Imagem de Cabo de Forca de Planta.png"
              alt="Plug com folha"
              width={400}
              height={400}
              className="w-full h-auto max-w-[300px] mx-auto md:max-w-none"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-2 mb-4 md:mb-6">
              Além disso, oferecemos uma oportunidade gratuita para que você
              também faça parte da salvação do nosso planeta!
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-green-2 leading-relaxed mb-8">
              Desenvolvemos uma calculadora de sustentabilidade para que, em
              apenas alguns passos, você possa entender quais são os seus
              maiores gastos e as maiores emissões de CO<sub>2</sub>.
            </p>
            <button
              onClick={() => {
                router.push("/analise");
              }}
              className="
                w-full
                px-8 py-4
                text-sm font-semibold uppercase
                text-white
                rounded-full
                bg-green-1
                hover:bg-green-2
                transition-all duration-300
                shadow-lg
                tracking-wider
              "
            >
              CALCULAR MEU GRAU DE SUSTENTABILIDADE
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}