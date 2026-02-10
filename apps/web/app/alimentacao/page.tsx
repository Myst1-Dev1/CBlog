import { TbDogBowl, TbClock, TbAlertTriangle } from "react-icons/tb";
import { IntroPages } from "../../components/introPages";
import { CategoryPosts } from "../../components/categoryPosts";

export default function Alimentacao() {
  return (
    <section className="container mx-auto px-4 py-20">
      <IntroPages
        pageName="Alimentação"
        title="A Alimentação"
        description="Descubra as melhores práticas e dicas essenciais para manter seu Corgi saudável, ativo e sempre feliz."
        btnText="Ver dicas"
        categories="Nutrição • Saúde • Bem-estar"
        image="/images/corgi-with-food.webp"
        imagePosition={false}
      />

      <section className="mt-20">
        <h2 className="text-xl lg:text-3xl text-center font-bold">
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

            <h3 className="group-hover:text-white font-bold text-xl text-center">
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

            <h3 className="group-hover:text-white font-bold text-xl text-center">
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

            <h3 className="group-hover:text-white font-bold text-xl text-center">
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

      <CategoryPosts category="Alimentação" />
    </section>
  );
}
