import { IntroPages } from "../../components/introPages";
import { CategoryPosts } from "../../components/categoryPosts";
import { FaStethoscope, FaRunning, FaSyringe } from "react-icons/fa";

export default function Saude() {
    return (
        <section className="container mx-auto px-4 py-20">
            <IntroPages
                pageName="Saúde"
                title="A Saúde"
                description="Cuidados essenciais e preventivos para garantir uma vida longa e saudável para seu Corgi."
                btnText="Ver cuidados"
                categories="Vacinação • Check-ups • Prevenção"
                image="/images/corgi-vet.webp"
                imagePosition={false}
            />

            <section className="mt-20">
                <h2 className="text-xl lg:text-3xl text-center font-bold">
                    Cuidados com a Saúde
                </h2>

                <p className="text-gray-500 mt-4 text-center text-base lg:text-lg font-light max-w-2xl mx-auto">
                    A prevenção é o melhor remédio. Mantenha a saúde do seu Corgi sempre em dia.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 place-items-center">
                    {/* Dica 1 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaSyringe />
                        </div>

                        <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                            Vacinação
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Mantenha a carteirinha de vacinação sempre atualizada.
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>💉 V8/V10 e Antirrábica anuais.</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🦠 Prevenção contra vermes e pulgas.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dica 2 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaRunning />
                        </div>

                        <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                            Exercícios Moderados
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Corgis têm propensão a problemas de coluna. Evite impactos.
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>🚫 Evite muitas escadas e pulos.</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🚶 Caminhadas diárias são ideais.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Dica 3 */}
                    <div className="max-w-80 w-full p-5 shadow-sm flex flex-col gap-3 rounded-2xl transition-all duration-500 group hover:bg-orange-400 h-full">
                        <div className="mx-auto w-14 h-14 text-3xl rounded-full text-white bg-orange-500 grid place-items-center group-hover:bg-white group-hover:text-orange-500 transition">
                            <FaStethoscope />
                        </div>

                        <h3 className="text-gray-900 group-hover:text-white font-bold text-xl text-center">
                            Check-ups Regulares
                        </h3>

                        <p className="text-gray-500 group-hover:text-white text-sm font-light text-center">
                            Visitas ao veterinário ajudam a identificar problemas cedo.
                        </p>

                        <ul className="mt-2 space-y-2 text-sm text-gray-600 group-hover:text-white">
                            <li className="flex gap-2 items-start justify-center">
                                <span>🩺 Exames de sangue anuais.</span>
                            </li>
                            <li className="flex gap-2 items-start justify-center">
                                <span>🦷 Cuidado com a saúde bucal.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <CategoryPosts category="Saúde" />
        </section>
    )
}
