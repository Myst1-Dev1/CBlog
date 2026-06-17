import { IntroPages } from "../../components/introPages";
import { CategoryPosts } from "../../components/categoryPosts";
import { FaStethoscope, FaRunning, FaSyringe, FaCheckCircle } from "react-icons/fa";

interface HealtCardProps {
    icon: any;
    title: string;
    description:string;
    items: any;
}

const HealthCard = ({ icon: Icon, title, description, items }:HealtCardProps) => (
    <div className="group relative flex flex-col p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50 transition-all duration-500 hover:bg-orange-500 hover:-translate-y-2">
        <div className="w-16 h-16 mb-6 rounded-2xl text-orange-500 bg-orange-50 flex items-center justify-center text-3xl group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
            <Icon />
        </div>

        <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
            {title}
        </h3>

        <p className="mt-3 text-gray-500 group-hover:text-orange-50 font-light leading-relaxed transition-colors">
            {description}
        </p>

        <div className="mt-6 pt-6 border-t border-gray-100 group-hover:border-white/20">
            <ul className="space-y-3">
                {items.map((item:any, idx:any) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-white transition-colors">
                        <FaCheckCircle className="text-orange-400 group-hover:text-orange-200 shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default function Saude() {
    return (
        <section className="container mx-auto px-4 py-20 lg:py-32">
            <IntroPages
                pageName="Saúde"
                title="Bem-estar Animal"
                description="Cuidados essenciais e preventivos para garantir uma vida longa e saudável para o seu fiel companheiro de patas curtas."
                btnText="Explorar Guia"
                categories="Vacinação • Ortopedia • Prevenção"
                image="/images/corgi-vet.webp"
                imagePosition={false}
            />

            <section className="mt-32">
                <div className="text-center mb-16">
                    <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">Prevenção</span>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
                        Pilares de uma Vida Saudável
                    </h2>
                    <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <HealthCard
                        icon={FaSyringe}
                        title="Vacinação"
                        description="A proteção vacinal é a primeira linha de defesa contra doenças fatais."
                        items={["V8/V10 e Antirrábica anuais", "Vermifugação trimestral", "Proteção contra Leishmaniose"]}
                    />

                    <HealthCard
                        icon={FaRunning}
                        title="Exercícios"
                        description="Foco em baixo impacto para proteger a coluna alongada característica da raça."
                        items={["Caminhadas em gramados", "Evitar saltos de sofás/camas", "Controle rigoroso de peso"]}
                    />

                    <HealthCard
                        icon={FaStethoscope}
                        title="Check-ups"
                        description="Exames preventivos detectam precocemente condições hereditárias."
                        items={["Avaliação renal e cardíaca", "Limpeza de tártaro periódica", "Triagem ortopédica (Quadril)"]}
                    />
                </div>
            </section>

            <div className="mt-32">
                <CategoryPosts category="Saúde" />
            </div>
        </section>
    );
}