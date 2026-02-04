'use client';

import Image from "next/image";
import { createComment } from "../../../actions/postsActions";
import { useActionState } from "react";
import { Loading } from "../../Loading";
import { useUserStore } from "../../../hooks/user/useUserStore";

interface CommentsProps {
    data: any;
}

export function Comments({ data }:CommentsProps) {
    const { user } = useUserStore();

    const [formState, formAction, pending] = useActionState(handleCreateComment, { success: false });

    async function handleCreateComment(prevState: any, formData: FormData) {
        const result = await createComment(prevState, formData);

        if (result?.message) {
            if (result.success) {
                alert(result.message);
            }
        }

        return result;
    }

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
            <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col lg:flex-row gap-5">
                    <Image className="w-10 h-10 rounded-full m-0 lg:m-auto object-cover" src="/images/user.jpg" width={400} height={400} alt="foto do autor do post" />
                    <div>
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-3">Jane Doe</h2>
                            <span className="text-xs text-gray-400">02/04/2025</span>
                        </div>
                        <p className="text-sm font-normal text-gray-500">
                            Com anos de experiência estudando e convivendo com Corgis, Jane Doe reúne conhecimento e carinho pela raça em seus artigos. Seu objetivo é informar, inspirar e aproximar ainda mais os apaixonados por esses peludos.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <Image className="w-10 h-10 rounded-full m-0 lg:m-auto object-cover" src="/images/user.jpg" width={400} height={400} alt="foto do autor do post" />
                    <div>
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold mb-3">Jane Doe</h2>
                            <span className="text-xs text-gray-400">02/04/2025</span>
                        </div>
                        <p className="text-sm font-normal text-gray-500">
                            Com anos de experiência estudando e convivendo com Corgis, Jane Doe reúne conhecimento e carinho pela raça em seus artigos. Seu objetivo é informar, inspirar e aproximar ainda mais os apaixonados por esses peludos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}