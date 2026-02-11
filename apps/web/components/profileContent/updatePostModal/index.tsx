'use client';

import { FaUpload } from "react-icons/fa";
import { Modal } from "../../Modal";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { updatePost } from "../../../actions/postsActions";
import { useActionState, useState } from "react";
import { Loading } from "../../Loading";
import Image from "next/image";
import { toast } from "react-toastify";
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { Post } from "../../../@types/Post";

interface UpdatePostModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    post: Post;
}

export function UpdatePostModal({ isOpen, setIsOpen, post }: UpdatePostModalProps) {
    const [formState, formAction, pending] = useActionState(handleUpdatePost, { success: false });
    const { fetchPostData } = usePostStore();

    const [file, setFile] = useState<File | null>(null);

    async function handleUpdatePost(prevState: any, formData: FormData) {
        const result = await updatePost(post.id, prevState, formData);

        if (result?.message) {
            if (result.success) {
                toast.success(result.message);
                await fetchPostData();
                setIsOpen(false);
                setFile(null);
            } else {
                toast.error(result.message);
            }
        }

        return result;
    }

    return (
        <>
            <Modal maxWidth='max-w-[500px]' isOpen={isOpen} setisOpen={setIsOpen}>
                <div className="form-modal w-full p-3 rounded-md overflow-y-auto h-full lg:h-[550px]">
                    <h2 className="text-center text-sm lg:text-xl font-bold">Atualizar sua postagem</h2>

                    <form action={formAction} className="w-full flex flex-col gap-3 mt-6">
                        <div className="grid grid-cols-1 gap-3">
                            {file ?
                                <Image className="w-full h-24 object-cover rounded-md" src={URL.createObjectURL(file)} width={200} height={200} alt="Nova imagem do post" />
                                :
                                <Image className="w-full h-24 object-cover rounded-md" src={post.postImageUrl || "/images/corgi.webp"} width={200} height={200} alt="Imagem atual do post" />
                            }
                            <label htmlFor='postImageUrlUpdate' className="cursor-pointer text-sm flex items-center justify-center gap-3 font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                                Alterar imagem do post <FaUpload />
                            </label>
                            <input accept="image/*" type="file" className="hidden" name="postImageUrl" id="postImageUrlUpdate" onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="title" className="font-semibold">Título</label>
                            <input type="text" className="input" name="title" defaultValue={post.title} placeholder="Título do post" />
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <select className="input" name="category" defaultValue={post.category}>
                                <option value='Alimentação'>Alimentação</option>
                                <option value='Treinamento'>Treinamento</option>
                                <option value='Saúde'>Saúde</option>
                                <option value='Curiosidades'>Curiosidades</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="description">Descrição</label>
                            <SunEditor
                                name="description"
                                height="150"
                                defaultValue={post.description}
                                setOptions={{
                                    buttonList: [
                                        ['undo', 'redo'],
                                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                        ['fontColor', 'hiliteColor'],
                                        ['outdent', 'indent'],
                                        ['align', 'list', 'horizontalRule'],
                                        ['table', 'link', 'image']
                                    ]
                                }}
                            />
                        </div>

                        {formState.message !== '' ?
                            <p className={`${formState.success === false ? 'text-red-600' : 'text-green-600'} font-bold mx-auto`}>{formState.message}</p>
                            : ''
                        }

                        <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600 shadow-md active:scale-95'>
                            {pending ? <Loading /> : 'Atualizar Post'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}
