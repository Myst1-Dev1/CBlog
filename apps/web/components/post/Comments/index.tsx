'use client';

import Image from "next/image";
import { createComment } from "../../../actions/postsActions";
import { useActionState } from "react";
import { Loading } from "../../Loading";
import { useUserStore } from "../../../hooks/user/useUserStore";
import { toast } from "react-toastify";

type CommentType = {
    authorId: number;
    content: string
    createdAt: string;
    id: number;
    name: string;
    postAuthorId: number;
    postId: number;
}

interface CommentsProps {
    data: any;
    comments: CommentType[];
}

export function Comments({ data, comments }: CommentsProps) {
    const { user, users } = useUserStore();

    const [formState, formAction, pending] = useActionState(handleCreateComment, { success: false });

    async function handleCreateComment(prevState: any, formData: FormData) {
        const result = await createComment(prevState, formData);

        if (result?.message) {
            if (result.success) {
                toast.success(result.message);
            }
        }

        return result;
    }

    const authorIds = new Set(comments?.map(p => p.authorId));

    const authors = users?.filter(user =>
        authorIds.has(user.id)
    );

    return (
        <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[var(--card-bg)] p-5 shadow-[0_18px_60px_rgba(119,74,21,0.08)] md:p-8 dark:border-stone-800/70 dark:bg-stone-950/70">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-[#E58E35]/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
            </div>

            <div className="relative z-10 space-y-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div className="space-y-2">
                        <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                            Interacoes
                        </span>
                        <h3 className="text-2xl font-black tracking-tight text-[#7a4308] dark:text-amber-100 md:text-3xl">
                            Comentarios
                        </h3>
                        <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-400">
                            Compartilhe sua impressão sobre o post e veja a conversa crescer com a comunidade.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-sm font-semibold text-[#8E4F00] shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900/70 dark:text-amber-200">
                        {comments.length} comentários
                    </span>
                </div>

                <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_16px_42px_rgba(119,74,21,0.06)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70 md:p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <Image
                            src={user?.avatarUrl || "/images/user.jpg"}
                            className="h-11 w-11 rounded-full border border-white/70 object-cover shadow-sm dark:border-stone-700"
                            width={44}
                            height={44}
                            alt="foto do usuário"
                        />
                        <div>
                            <h4 className="font-bold text-[var(--foreground)]">Deixe seu comentário</h4>
                            <p className="text-xs text-[var(--text-muted)] dark:text-stone-400">Sua mensagem entra logo abaixo do artigo.</p>
                        </div>
                    </div>

                    <form action={formAction} className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="hidden">
                                <input type="hidden" name="postId" value={data.id} />
                                <input type="hidden" name="authorId" value={user?.id} />
                                <input type="text" value={user?.username} className="hidden" name="name" readOnly />
                            </div>

                            <div className="flex-1">
                                <textarea
                                    name="content"
                                    placeholder="Escreva algo sobre este post..."
                                    className="min-h-36 w-full resize-none rounded-[24px] border border-[#E58E35]/15 bg-[var(--background)] p-4 text-sm text-[var(--foreground)] outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[#E58E35]/40 focus:ring-2 focus:ring-[#E58E35]/10 dark:border-stone-800 dark:bg-stone-950/80 dark:placeholder:text-stone-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pl-0 md:pl-14">
                            {formState.message !== '' && (
                                <p className={`text-sm font-medium ${formState.success === false ? 'text-red-600' : 'text-emerald-600'}`}>
                                    {formState.message}
                                </p>
                            )}
                            <button
                                disabled={pending}
                                className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#8E4F00] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(142,79,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#733f00] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400"
                            >
                                {pending ? <Loading /> : 'Publicar'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col gap-5">
                    {comments.map(comment => {
                        const author = authors?.find((author) => author.id === comment.authorId);

                        return (
                            <div key={comment.id} className="group flex gap-4">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="h-11 w-11 rounded-full object-cover border border-white/70 shadow-sm dark:border-stone-700"
                                        src={author?.avatarUrl || "/images/user.jpg"}
                                        width={44}
                                        height={44}
                                        alt="foto do autor"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="rounded-[24px] rounded-tr-none border border-white/70 bg-white/85 p-5 shadow-[0_12px_28px_rgba(119,74,21,0.06)] transition-colors group-hover:border-[#E58E35]/20 dark:border-stone-800/70 dark:bg-stone-900/70">
                                        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                                            <div>
                                                <h5 className="text-sm font-black text-[var(--foreground)]">{author?.username || comment.name}</h5>
                                                <span className="text-xs font-medium text-[var(--text-muted)] dark:text-stone-400">
                                                    {new Date(comment.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <span className="inline-flex rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                                leitor
                                            </span>
                                        </div>

                                        <p className="text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-300">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
