import { Intro } from "../components/home/Intro";
import { Pagination } from "../components/home/pagination";
import { Posts } from "../components/home/posts";

export default function Home() {
  return (
    <>
      <Intro />
      <div className="container py-8">
        <h2 className="font-bold mb-3 text-2xl">Blog</h2>
        <p className="text-gray-400 font-medium">Nosso blog foi feito dedicado a abordar temas que envolvem essa raça de cachorros conhecida como Corgi.</p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <span className="w-fit px-3 py-2 bg-orange-400 rounded-md text-white font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-600 hover:text-white">Todos</span>
          <span className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Alimentação</span>
          <span className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Treinamento</span>
          <span className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Saúde</span>
          <span className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Curiosidades</span>
        </div>
        <Posts />
        <Pagination />
      </div>
    </>
  );
}
