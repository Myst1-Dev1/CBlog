'use client';

import Image from "next/image";
import { useUserStore } from "../../hooks/user/useUserStore";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";
import { NewPostModal } from "./newPostModal";
import { usePostStore } from "../../hooks/posts/usePostStore";

export function ProfileContent() {
    const { user, users } = useUserStore();
    const { post } = usePostStore();

    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    
    if (!post || !user) return null;

    const myPosts = post.filter(
        (data) => data.authorId === user.id
    );

    console.log('usuarios', users);

    return (
        <>
            <div className="container py-16 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="flex items-center gap-3 col-span-2">
                        <Image className="rounded-full aspect-square object-cover max-w-32 w-full" src={user?.avatarUrl || '/images/user.jpg'} width={300} height={300} alt="foto de usuário" />
                        <div className="flex flex-col gap-3 font-semibold">
                            <span className="text-xl">{user?.username}</span>
                        </div>
                    </div>
                    <button onClick={() => setIsNewPostModalOpen(true)} className="bg-orange-500 h-fit w-fit mx-auto m-auto text-white p-3 rounded-md font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-600">Criar novo post</button>
                </div>
                <div className="py-12">
                    <h2 className="font-bold text-xl">Meus posts</h2>
                    <div className="mt-8 grid lg:grid-cols-3 grid-cols-1 gap-5 place-items-center">
                         {myPosts.map(post => (
                            <div key={post.id} className="max-w-96 w-full relative">
                                <Image className="w-full h-52 mb-2 rounded-md object-cover" src={post.postImageUrl || "/images/corgi.webp"} width={400} height={400} alt="foto do post" />
                                <span className="text-gray-500 text-xs">30 de Janeiro, 2025</span>
                                <h3 className="text-xl lg:text-2xl font-semibold">{post.title}</h3>
                                <div
                                    className="text-gray-500 font-thin line-clamp-2 text-sm"
                                    dangerouslySetInnerHTML={{ __html: post.description }}
                                />
                                <Link href={`post/` + post.id} className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white">Ver Mais <FaArrowRightLong /></Link>
                                <div className="mt-5 flex items-center gap-3">
                                    <Image className="w-8 h-8 rounded-full object-cover" src={user?.avatarUrl || "/images/user.jpg"} width={32} height={32} alt="foto do usuário que fez a postagem" />
                                    <span className="font-medium">{user?.username}</span>
                                </div>
                                <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">{post.category}</span>
                            </div>
                         ))}
                    </div>
                </div>
            </div>
            <NewPostModal isOpen={isNewPostModalOpen} setIsOpen={setIsNewPostModalOpen} />
        </>
    )
}