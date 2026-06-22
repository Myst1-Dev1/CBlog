import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(12,10,9,0.98),rgba(5,4,4,1))] text-white">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-12 top-10 h-48 w-48 rounded-full bg-[#E58E35]/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-14 md:py-16">
                <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                    <div className="space-y-5 lg:col-span-5">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-200 backdrop-blur">
                            Corgi Blog
                        </span>
                        <h2 className="max-w-md text-3xl font-black tracking-tight text-white sm:text-4xl">
                            Curiosidades, cuidados e histórias em um único refugio editorial.
                        </h2>
                        <p className="max-w-xl text-sm leading-relaxed text-white/65">
                            Nosso blog é dedicado a compartilhar curiosidades, cuidados e tudo o que envolve o mundo encantador dos Corgis, com um visual quente e acolhedor.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4">
                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-200">Navegação</p>
                            <div className="mt-4 space-y-3 text-sm text-white/70">
                                <p><Link href="/" className="transition-colors hover:text-amber-200">Início</Link></p>
                                <p><Link href="/posts" className="transition-colors hover:text-amber-200">Posts</Link></p>
                                <p><Link href="/perfil" className="transition-colors hover:text-amber-200">Perfil</Link></p>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-200">Contato</p>
                            <div className="mt-4 space-y-3 text-sm text-white/70">
                                <p>Suporte e novidades do blog.</p>
                                <p>Compartilhe seu amor por Corgis com a comunidade.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 lg:col-span-3">
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-200">Redes sociais</p>
                        <div className="flex gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:bg-[#E58E35]/10 hover:text-[#f7c98b]">
                                <FaFacebookF />
                            </span>
                            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:bg-[#E58E35]/10 hover:text-[#f7c98b]">
                                <FaInstagram />
                            </span>
                            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:bg-[#E58E35]/10 hover:text-[#f7c98b]">
                                <FaTwitter />
                            </span>
                        </div>

                        <div className="rounded-[28px] border border-[#E58E35]/20 bg-[#E58E35]/10 p-5 text-sm text-white/75 backdrop-blur">
                            <p className="font-bold text-white">Myst1 Dev</p>
                            <p className="mt-2 leading-relaxed">
                                Desenvolvido por <a href="https://www.mystdev.com.br/" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-200 transition-colors hover:text-white">Myst1 Dev</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/45">
                    &copy; 2026 Corgi Blog. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
