import Image from "next/image";
import { TbDogBowl, TbClock, TbAlertTriangle } from "react-icons/tb";

export default function Alimentacao() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="max-w-xl">
          <span className="inline-block mb-4 font-semibold text-sm lg:text-base bg-orange-500 text-white rounded-full px-4 py-1">
            Alimentação
          </span>

          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            A Alimentação <br />
            Ideal Para <span className="text-orange-500">Corgis</span>
          </h1>

          <p className="text-gray-500 mt-5 text-base lg:text-lg font-light">
            Descubra as melhores práticas e dicas essenciais para manter
            seu Corgi saudável, ativo e sempre feliz.
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="rounded-full cursor-pointer bg-orange-500 text-white px-6 py-3 font-semibold transition-all duration-500 hover:bg-orange-600 hover:scale-105">
              Ver dicas
            </button>

            <span className="text-sm text-gray-400">
              Nutrição • Saúde • Bem-estar
            </span>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-orange-100 rounded-full blur-3xl"></div>

          <Image
            src="/images/corgi-with-food.webp"
            width={350}
            height={350}
            priority
            className="object-cover"
            alt="Corgi feliz com prato de ração saudável"
          />
        </div>

      </div>

      <section className="mt-20">
        <h2 className="text-xl lg:text-3xl text-center font-bold text-gray-900">
            Dicas de Alimentação
        </h2>

        <p className="text-gray-500 mt-4 text-center text-base lg:text-lg font-light max-w-2xl mx-auto">
            Essenciais para manter seu Corgi saudável, equilibrado e cheio de energia.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 place-items-center">
            <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400">
            <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                <TbDogBowl />
            </div>

            <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                Nutrição Balanceada
            </h3>

            <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                Uma alimentação equilibrada ajuda na saúde, no peso e na longevidade.
            </p>

            <ul className="mt-2 space-y-2 text-sm">
                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>
                    <strong>Proteínas:</strong> frango, carne magra, peixe, peru.
                </span>
                </li>

                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>
                    <strong>Vegetais:</strong> brócolis, cenoura, abóbora.
                </span>
                </li>
            </ul>
            </div>

            <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400">
            <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                <TbClock />
            </div>

            <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                Horários Regulares
            </h3>

            <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                Rotina alimentar traz estabilidade e evita ansiedade.
            </p>

            <ul className="mt-2 space-y-2 text-sm">
                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>
                    Alimente sempre nos <strong>mesmos horários</strong>.
                </span>
                </li>

                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>
                    O ideal é <strong>2 refeições por dia</strong> (manhã e tarde).
                </span>
                </li>
            </ul>
            </div>

            <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400">
            <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                <TbAlertTriangle />
            </div>

            <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                Alimentos a Evitar
            </h3>

            <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                Alguns alimentos podem ser tóxicos ou perigosos para Corgis.
            </p>

            <ul className="mt-2 space-y-2 text-sm">
                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>Chocolate, cebola e alho</span>
                </li>

                <li className="flex gap-2 items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-orange-400 group-hover:bg-white" />
                <span>Uvas, ossos cozidos e alimentos gordurosos</span>
                </li>
            </ul>
            </div>
        </div>
      </section>
    </section>
  );
}
