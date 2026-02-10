import { IntroPages } from "../../components/introPages";
import { CategoryPosts } from "../../components/categoryPosts";
import { FaDog, FaBone, FaBrain } from "react-icons/fa";

export default function Treinamento() {
    return (
        <section className="container mx-auto px-4 py-20">
            <IntroPages
                pageName="Treinamento"
                title="O Treinamento"
                description="Descubra as melhores práticas e dicas essenciais para adestrar seu Corgi com amor e eficiência."
                btnText="Ver dicas"
                categories="Obediência • Truques • Comportamento"
                image="/images/corgi-playing.webp"
                imagePosition={true}
            />

            <section className="mt-20">
                <h2 className="text-xl lg:text-3xl text-center font-bold">
                    Dicas de Treinamento
                </h2>

                <p className="text-gray-500 mt-4 text-center text-base lg:text-lg font-light max-w-2xl mx-auto">
                    Educar um Corgi requer paciência, consistência e muito reforço positivo.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 place-items-center">
                    {/* Dica 1 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaBone />
                        </div>

                        <h3 className="group-hover:text-white font-bold text-xl text-center">
                            Reforço Positivo
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Corgis são motivados por comida e elogios. Use isso a seu favor!
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>🍬 Recompense acertos imediatamente.</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🚫 Evite punições físicas.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dica 2 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaClock />
                        </div>

                        <h3 className="group-hover:text-white font-bold text-xl text-center">
                            Consistência
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Use sempre os mesmos comandos e regras para não confundir o cão.
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>🗣️ Comandos curtos: "Senta", "Fica".</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🏠 Regras claras para toda a família.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dica 3 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaBrain />
                        </div>

                        <h3 className="group-hover:text-white font-bold text-xl text-center">
                            Socialização
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Exponha seu Corgi a diferentes pessoas, sons e ambientes desde cedo.
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>🐕 Encontros com outros cães <br />amigáveis.</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🚶 Passeios em locais variados.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <CategoryPosts category="Treinamento" />
        </section>
    )
}

function FaClock(props: any) {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>
    )
}