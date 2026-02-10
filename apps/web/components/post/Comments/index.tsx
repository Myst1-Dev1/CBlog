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
        <div className="w-full">
            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-8 flex items-center gap-3">
                Comentários
                <span className="px-2 py-1 bg-[var(--card-border)] text-[var(--text-muted)] text-sm rounded-full">{comments.length}</span>
            </h3>

            <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--card-border)] mb-12">
                <h4 className="font-semibold text-[var(--foreground)] mb-4">Deixe seu comentário</h4>
                <form action={formAction} className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                        <Image
                            src={user?.avatarUrl || "/images/user.jpg"}
                            className="w-10 h-10 object-cover rounded-full border border-white shadow-sm"
                            width={40}
                            height={40}
                            alt="foto do usuário"
                        />
                        <div className="flex-1">
                            <input type="hidden" name="postId" value={data.id} />
                            <input type="hidden" name="authorId" value={user?.id} />
                            <input type="text" value={user?.username} className="hidden" name="name" />

                            <textarea
                                name="content"
                                placeholder="Escreva algo sobre este post..."
                                className="w-full h-32 p-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)] focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all resize-none text-[var(--foreground)] placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center pl-14">
                        {formState.message !== '' && (
                            <p className={`text-sm font-medium ${formState.success === false ? 'text-red-600' : 'text-green-600'}`}>
                                {formState.message}
                            </p>
                        )}
                        <button
                            disabled={pending}
                            className="cursor-pointer ml-auto px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {pending ? <Loading /> : 'Publicar'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col gap-8">
                {comments.map(comment => {
                    const author = authors?.find((author) => author.id === comment.authorId);

                    return (
                        <div key={comment.id} className="group flex gap-4 animate-fade-in">
                            <div className="flex-shrink-0">
                                <Image
                                    className="w-10 h-10 rounded-full object-cover border border-gray-100"
                                    src={author?.avatarUrl || "/images/user.jpg"}
                                    width={40}
                                    height={40}
                                    alt="foto do autor"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="bg-[var(--card-bg)] p-4 rounded-b-xl rounded-tr-xl border border-[var(--card-border)] shadow-sm relative group-hover:border-orange-100 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h5 className="font-bold text-[var(--foreground)] text-sm">{author?.username || comment.name}</h5>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {new Date(comment.createdAt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}