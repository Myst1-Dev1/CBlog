'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaPencilAlt, FaTrashAlt, FaPlus, FaCalendarAlt, FaChartLine, FaNewspaper } from "react-icons/fa";

import { useUserStore } from "../../hooks/user/useUserStore";
import { usePostStore } from "../../hooks/posts/usePostStore";
import { deletePost } from "../../actions/postsActions";
import { NewPostModal } from "./newPostModal";

export function ProfileContent() {
    const { user } = useUserStore();
    const { post } = usePostStore();
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

    if (!post || !user) return null;

    const myPosts = post.filter((data) => data.authorId === user.id);

    async function handleDeletePost(id: number) {
        if (!confirm("Tem certeza que deseja excluir este post?")) return;

        try {
            await deletePost(id);
            toast.success('Post deletado com sucesso');
        } catch (error: any) {
            toast.error('Erro ao deletar o post');
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="relative h-60 lg:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-black to-gray-500" />
                <div className="absolute inset-0 bg-black/10" />

                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="container px-4 sm:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 -mt-20 mb-8">

                    {/* 2. Overlapping Avatar */}
                    <div className="relative group">
                        <div className="p-1 rounded-full bg-white shadow-xl">
                            <Image
                                className="rounded-full aspect-square object-cover w-32 h-32 lg:w-40 lg:h-40 border-4 border-white"
                                src={user?.avatarUrl || '/images/user.jpg'}
                                width={300}
                                height={300}
                                alt="Foto de perfil"
                            />
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                            <FaPencilAlt size={12} />
                        </button>
                    </div>

                    {/* 3. User Info & Actions */}
                    <div className="flex-1 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white">{user?.username}</h1>
                            <span className="text-gray-500 font-medium">@{user?.email}</span>
                            <p className="text-gray-500 max-w-lg mt-2 text-sm leading-relaxed">
                                Entusiasta de tecnologia e amante de Corgis. Compartilhando histórias e dicas sobre o universo canino.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3">
                            <button className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                                Editar Perfil
                            </button>
                            <button
                                onClick={() => setIsNewPostModalOpen(true)}
                                className="cursor-pointer px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <FaPlus size={14} />
                                Novo Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <FaNewspaper size={20} />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900">{myPosts.length}</span>
                            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Publicações</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <FaChartLine size={20} />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold text-gray-900">1.2k</span>
                            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Visualizações</span>
                        </div>
                    </div>
                </div>

                {/* 5. Modern Post Grid */}
                <div className="border-t border-gray-200 pt-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FaNewspaper className="text-orange-500" />
                        Minhas Publicações
                    </h2>

                    {myPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <FaNewspaper size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Nenhuma publicação ainda</h3>
                            <p className="text-gray-500 max-w-xs mt-1">Comece a compartilhar suas histórias com a comunidade Corgi.</p>
                            <button
                                onClick={() => setIsNewPostModalOpen(true)}
                                className="cursor-pointer mt-6 text-orange-600 font-semibold hover:underline"
                            >
                                Criar primeiro post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {myPosts.map(post => (
                                <div key={post.id} className="group rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                                    {/* Image Area */}
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            src={post.postImageUrl || "/images/corgi.webp"}
                                            width={500}
                                            height={300}
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-gray-900">
                                            {post.category}
                                        </span>

                                        {/* Hover Actions */}
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                                            <button className="cursor-pointer p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Editar">
                                                <FaPencilAlt size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="cursor-pointer p-2 bg-white text-gray-700 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title="Excluir"
                                            >
                                                <FaTrashAlt size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                                            <FaCalendarAlt />
                                            <span>30 Jan, 2025</span>
                                        </div>

                                        <Link href={`/post/${post.id}`} className="block mb-3">
                                            <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <div
                                            className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-4 flex-1"
                                            dangerouslySetInnerHTML={{ __html: post.description }}
                                        />

                                        <Link
                                            href={`/post/${post.id}`}
                                            className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mt-auto"
                                        >
                                            Ler mais &rarr;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <NewPostModal isOpen={isNewPostModalOpen} setIsOpen={setIsNewPostModalOpen} />
        </div>
    )
}