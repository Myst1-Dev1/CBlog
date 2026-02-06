import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

export function Footer() {
    return (
        <>
            <div className="bg-black flex flex-col justify-center items-center text-white">
                <div className="max-w-80 w-full py-6 flex flex-col items-center text-center">
                    <h2 className="text-xl font-bold">Corgi Blog</h2>
                    <p>Nosso blog é dedicado a compartilhar curiosidades, cuidados e tudo o que envolve o mundo encantador dos Corgis</p>
                    <div className="flex gap-4 mt-4">
                        <span className="bg-[#303030] w-10 h-10 grid place-items-center rounded-full cursor-pointer transition-all duration-500 hover:bg-orange-400"><FaFacebookF /></span>
                        <span className="bg-[#303030] w-10 h-10 grid place-items-center rounded-full cursor-pointer transition-all duration-500 hover:bg-orange-400"><FaInstagram /></span>
                        <span className="bg-[#303030] w-10 h-10 grid place-items-center rounded-full cursor-pointer transition-all duration-500 hover:bg-orange-400"><FaTwitter /></span>
                    </div>
                </div>
                <div className="py-4 border-t border-gray-600 w-full text-center text-sm text-white/50">
                    &copy; 2026 Corgi Blog. All rights reserved.
                    <p>Desenvolvido por <a href="https://www.mystdev.com.br/" target="_blank" rel="noopener noreferrer" className="text-white/20 transition-all duration-500 hover:text-orange-400">Myst1 Dev</a></p>
                </div>
            </div>
        </>
    )
}