'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaPencilAlt, FaTrashAlt, FaPlus, FaCalendarAlt, FaChartLine, FaNewspaper, FaRegBookmark, FaRegClock } from "react-icons/fa";

import { useUserStore } from "../../hooks/user/useUserStore";
import { usePostStore } from "../../hooks/posts/usePostStore";
import { deletePost } from "../../actions/postsActions";
import { NewPostModal } from "./newPostModal";
import { UpdatePostModal } from "./updatePostModal";
import { Post } from "../../@types/Post";

export function ProfileContent() {
    const { user } = useUserStore();
    const { post, fetchPostData } = usePostStore();
    const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
    const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    if (!post || !user) return null;

    const myPosts = post.filter((data) => data.authorId === user.id);
    const latestPost = myPosts[0];

    function handleEditPost(post: Post) {
        setSelectedPost(post);
        setIsUpdatePostModalOpen(true);
    }

    async function handleDeletePost(id: number) {
        if (!confirm("Tem certeza que deseja excluir este post?")) return;

        try {
            await deletePost(id);
            await fetchPostData();
            toast.success('Post deletado com sucesso');
        } catch (error: any) {
            toast.error('Erro ao deletar o post');
            console.error(error);
        }
    }

    return (
        <main className="relative overflow-hidden bg-[linear-gradient(180deg,_var(--background),_rgba(255,247,237,0.95))] pb-20 dark:bg-[linear-gradient(180deg,_var(--background),_rgba(10,8,7,0.98))]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.1),_transparent_60%)]" />
            <div className="pointer-events-none absolute right-[-8%] top-[480px] h-[340px] w-[340px] rounded-full bg-amber-300/10 blur-3xl" />

            <section className="relative px-4 pt-6 md:pt-10">
                <div className="container mx-auto overflow-hidden rounded-[38px] border border-white/70 bg-[var(--card-bg)] shadow-[0_24px_80px_rgba(119,74,21,0.08)] dark:border-stone-800/70 dark:bg-stone-950/70">
                    <div className="grid gap-0 lg:grid-cols-12">
                        <div className="relative min-h-[280px] lg:col-span-4">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(229,142,53,0.95),rgba(142,79,0,0.9))]" />
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
                            <div className="relative flex h-full flex-col justify-between p-6 text-white md:p-8">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase text-[8px] lg:tracking-[0.35em] text-white/90 backdrop-blur">
                                        Seu espaço
                                    </span>
                                    <span className="inline-flex rounded-full border border-white/20 bg-black/15 px-4 py-2 text-[11px] font-semibold uppercase text-[8px] lg:tracking-[0.3em] text-white/80 backdrop-blur">
                                        Painel pessoal
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative group">
                                            <div className="rounded-full bg-white/15 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur">
                                                <Image
                                                    className="h-28 w-28 rounded-full border-4 border-white/90 object-cover md:h-32 md:w-32"
                                                    src={user?.avatarUrl || '/images/user.jpg'}
                                                    width={320}
                                                    height={320}
                                                    alt="Foto de perfil"
                                                />
                                            </div>
                                            <button className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-stone-950/80 text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                                                <FaPencilAlt size={12} />
                                            </button>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-xs font-semibold uppercase text-[8px] lg:tracking-[0.35em] text-white/70">Perfil</p>
                                            <h1 className="text-3xl font-black tracking-tight md:text-4xl">{user?.username}</h1>
                                            <span className="text-sm text-white/75">@{user?.email}</span>
                                        </div>
                                    </div>

                                    <p className="max-w-xl text-sm leading-relaxed text-white/85">
                                        Entusiasta de tecnologia e amante de Corgis. Compartilhando histórias e dicas sobre o universo canino com um diário visual mais elegante.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 p-6 md:p-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                <div className="space-y-2">
                                    <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase text-[8px] lg:tracking-[0.35em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                        Dashboard de autor
                                    </span>
                                    <h2 className="text-2xl font-black tracking-tight text-[#7a4308] dark:text-amber-100 md:text-3xl">
                                        Gerencie suas publicações com foco e clareza
                                    </h2>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <button className="cursor-pointer rounded-full border border-white/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/25 hover:text-[#8E4F00] dark:border-stone-800/70 dark:bg-stone-900/70 dark:text-stone-200 dark:hover:border-amber-400/20 dark:hover:text-amber-200">
                                        Editar Perfil
                                    </button>
                                    <button
                                        onClick={() => setIsNewPostModalOpen(true)}
                                        className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#E58E35] px-5 py-2.5 text-sm font-bold text-white shadow-[0_16px_30px_rgba(229,142,53,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d97a16]"
                                    >
                                        <FaPlus size={14} />
                                        Novo Post
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
                                <div className="flex gap-3 items-center rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                                    <div className="rounded-md w-8 h-8 p-1 grid place-items-center bg-[#2F2410] text-[#C19E27] shrink-0">
                                        <FaNewspaper />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{myPosts.length}</h3>
                                        <span className="uppercase text-[8px] lg:text-xs text-stone-400 font-semibold">Publicações</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                                    <div className="rounded-md w-8 h-8 p-1 grid place-items-center bg-[#2F2410] text-[#C19E27] shrink-0">
                                        <FaChartLine />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">1.2k</h3>
                                        <span className="uppercase text-[8px] lg:text-xs text-stone-400 font-semibold">Visualizações</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                                    <div className="rounded-md w-8 h-8 p-1 grid place-items-center bg-[#2F2410] text-[#C19E27] shrink-0">
                                        <FaRegBookmark />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{latestPost ? 1 : 0}</h3>
                                        <span className="uppercase text-[8px] lg:text-xs text-stone-400 font-semibold">Último Destaque</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center rounded-[24px] border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                                    <div className="rounded-md w-8 h-8 p-1 grid place-items-center bg-[#2F2410] text-[#C19E27] shrink-0">
                                        <FaRegClock />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{myPosts.length ? "Ativo" : "Novo"}</h3>
                                        <span className="uppercase text-[8px] lg:text-xs text-stone-400 font-semibold">status</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 pt-8 md:pt-10">
                <div className="container mx-auto">
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-2">
                            <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase text-[8px] lg:tracking-[0.35em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                Biblioteca pessoal
                            </span>
                            <h2 className="text-2xl font-black tracking-tight text-[#7a4308] dark:text-amber-100 md:text-3xl">
                                Minhas publicações
                            </h2>
                        </div>
                    </div>

                    {myPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-[34px] border border-dashed border-[#E58E35]/20 bg-white/80 py-20 text-center shadow-[0_16px_42px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/65">
                            <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#E58E35]/10 text-[#E58E35] dark:bg-amber-400/10 dark:text-amber-300">
                                <FaNewspaper size={28} />
                            </div>
                            <h3 className="text-lg font-black text-[#6f3c07] dark:text-white">Nenhuma publica��o ainda</h3>
                            <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-400">Comece a compartilhar suas hist�rias com a comunidade Corgi.</p>
                            <button
                                onClick={() => setIsNewPostModalOpen(true)}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8E4F00] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#733f00] dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
                            >
                                <FaPlus size={14} />
                                Criar primeiro post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {myPosts.map(post => (
                                <div key={post.id} className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-[0_18px_50px_rgba(119,74,21,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(119,74,21,0.12)] dark:border-stone-800/70 dark:bg-stone-900/70">
                                    <div className="relative h-60 overflow-hidden">
                                        <Image
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            src={post.postImageUrl || "/images/corgi.webp"}
                                            width={500}
                                            height={300}
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-85" />

                                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase text-[8px] lg:tracking-wider text-gray-900 shadow-sm backdrop-blur dark:bg-stone-950/80 dark:text-amber-100">
                                            {post.category}
                                        </span>

                                        <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-12 transition-transform duration-300 group-hover:translate-x-0">
                                            <button
                                                onClick={() => handleEditPost(post)}
                                                className="cursor-pointer grid h-10 w-10 place-items-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-[#E58E35]/10 hover:text-[#E58E35] dark:bg-stone-950/80 dark:text-stone-200"
                                                title="Editar"
                                            >
                                                <FaPencilAlt size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="cursor-pointer grid h-10 w-10 place-items-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-red-50 hover:text-red-600 dark:bg-stone-950/80 dark:text-stone-200 dark:hover:bg-red-500/10"
                                                title="Excluir"
                                            >
                                                <FaTrashAlt size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[var(--text-muted)] dark:text-stone-400">
                                            <FaCalendarAlt />
                                            <span>30 Jan, 2025</span>
                                        </div>

                                        <Link href={`/post/${post.id}`} className="block">
                                            <h3 className="line-clamp-2 text-xl font-black text-[#6f3c07] transition-colors group-hover:text-[#E58E35] dark:text-white">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <div
                                            className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-400"
                                            dangerouslySetInnerHTML={{ __html: post.description }}
                                        />

                                        <Link
                                            href={`/post/${post.id}`}
                                            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#E58E35] transition-colors hover:text-[#c96e0f]"
                                        >
                                            Ler mais
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <NewPostModal isOpen={isNewPostModalOpen} setIsOpen={setIsNewPostModalOpen} />
            {selectedPost && (
                <UpdatePostModal
                    isOpen={isUpdatePostModalOpen}
                    setIsOpen={setIsUpdatePostModalOpen}
                    post={selectedPost}
                />
            )}
        </main>
    )
}
