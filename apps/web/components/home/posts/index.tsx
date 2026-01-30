import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export function Posts() {
    return (
        <>
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
                <div className="max-w-96 w-full relative">
                    <Image className="w-full h-52 mb-2 rounded-md object-cover" src="/images/corgi.webp" width={400} height={400} alt="foto do post" />
                    <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                    <h3 className="text-xl lg:text-2xl font-semibold">O treinamento de um Corgi</h3>
                    <p className="text-gray-500 font-thin line-clamp-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ea at facilis illum cupiditate sequi aliquid, inventore dicta vel, aspernatur doloribus quisquam illo ipsam voluptate dolore. A ipsam fugit dolores.</p>
                    <Link href="/post/1" className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                    <div className="mt-5 flex items-center gap-3">
                        <Image className="w-8 h-8 rounded-full object-cover" src="/images/user.jpg" width={32} height={32} alt="foto do usuário que fez a postagem" />
                        <span className="font-medium">Jane Doe</span>
                    </div>
                    <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">Treinamento</span>
                </div>
            </div>
        </>
    )
}