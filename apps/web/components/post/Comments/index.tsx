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

export function Comments({ data, comments }:CommentsProps) {
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

    console.log('aqui', authors);

    return (
        <div className="container">
            <div className="py-16">
                <h3 className="text-xl font-bold">Faça um comentário</h3>
                <form action={formAction} className="rounded-xl w-full p-4 mt-5 flex flex-col lg:flex-row gap-4 items-start lg:items-center shadow-sm">
                    <div className="flex items-start gap-3 flex-1 w-full">
                        <Image
                        src={user?.avatarUrl || "/images/user.jpg"}
                        className="w-10 h-10 object-cover m-auto rounded-full"
                        width={40}
                        height={40}
                        alt="foto do usuário"
                        />
                        <input type="hidden" name="postId" value={data.id} />
                        <input type="hidden" name="authorId" value={user?.id} />
                        <input type="text" value={user?.username} className="hidden" name="name" />
                        <textarea
                        name="content"
                        placeholder="Gostei do post..."
                        className="
                            w-full
                            h-20
                            resize-none
                            rounded-lg
                            border border-gray-300
                            px-3 py-2
                            text-sm
                            outline-none
                        "
                        />
                        {formState.message !== '' ?
                            <p className={`${formState.success === false ? 'text-red-600' : 'text-green-600'} font-bold mx-auto`}>{formState.message}</p>
                            : ''
                        }
                    </div>

                    <button
                        className="
                        cursor-pointer
                        bg-orange-500
                        text-white
                        font-semibold
                        rounded-lg
                        px-6
                        py-3
                        w-full
                        lg:w-auto
                        transition-all
                        duration-300
                        hover:bg-orange-600
                        active:scale-95
                        "
                    >
                        {pending ? <Loading /> : 'Enviar'}
                    </button>
                </form>
            </div>
            <h2 className="font-medium">Comentários</h2>
            <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {comments.map(comment => {
                    const author = authors?.find(
                    (author) => author.id === comment.authorId
                    );

                    return (
                    <div
                        key={comment.id}
                        className="flex items-start gap-4 border-b border-gray-200 pb-6"
                    >
                        <Image
                            className="w-10 h-10 rounded-full object-cover"
                            src={author?.avatarUrl || "/images/user.jpg"}
                            width={40}
                            height={40}
                            alt="foto do autor do comentário"
                        />

                        <div className="flex-1">
                            <div className="flex justify-between w-full items-center gap-2">
                                <h2 className="text-sm font-semibold">
                                    {author?.username || comment.name}
                                </h2>

                                <span className="text-xs text-gray-400">
                                    {new Date(comment.createdAt).toLocaleDateString('pt-BR')}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                    );
                })}
            </div>
        </div>
    )
}