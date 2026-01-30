import Image from "next/image";
import Link from "next/link";

export function Intro() {
    return (
        <>
            <div className="flex items-end justify-center relative w-full min-h-dvh lg:min-h-screen bg-[url('/images/corgi.webp')] bg-cover bg-center">
                <div className="absolute z-10 inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                <div className="container flex items-end justify-end min-h-screen py-12 z-20">
                    <div className="text-white flex justify-between flex-wrap gap-7 lg:gap-0 items-center w-full">
                        <div className="max-w-md w-full flex flex-col gap-4">
                            <span className="w-fit px-2 py-1 bg-orange-300 rounded-full font-medium text-white">Alimentação</span>
                            <h2 className="font-semibold text-2xl">A alimentação dos corgis algo importante</h2>
                            <p className="line-clamp-2 text-sm font-thin">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum quo suscipit quia possimus incidunt dolores, aut, alias enim repellendus facilis ipsum perspiciatis delectus iusto, voluptatem natus eos! Eligendi, consequatur corporis!</p>
                            <Link href="/post/1" className="grid place-items-center w-fit h-10 rounded-full px-2 bg-white text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-500 hover:text-white">Ver Mais</Link>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-white block cursor-pointer"></span>
                                <span className="w-4 h-4 rounded-full border border-white block cursor-pointer"></span>
                                <span className="w-4 h-4 rounded-full border border-white block cursor-pointer"></span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-5">
                                <Image src="/images/user.jpg" width={200} height={200} className="w-14 h-14 rounded-full aspect-square object-cover" alt="foto do usuário" />
                                <h3 className="font-semibold">Lena Doe</h3>
                            </div>
                            <span className="text-sm font-thin">24 de Janeiro de 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}