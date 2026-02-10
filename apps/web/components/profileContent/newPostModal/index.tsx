import { FaUpload } from "react-icons/fa";
import { Modal } from "../../Modal";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { createNewPost } from "../../../actions/postsActions";
import { useActionState, useState } from "react";
import { Loading } from "../../Loading";
import Image from "next/image";
import { toast } from "react-toastify";

interface NewPostModalProps {
    isOpen: boolean;
    setIsOpen: any;
}

export function NewPostModal({ isOpen, setIsOpen }: NewPostModalProps) {
    const [formState, formAction, pending] = useActionState(handleCreateNewPost, { success: false });

    const [file, setFile] = useState<File | null>(null);

    async function handleCreateNewPost(prevState: any, formData: FormData) {
        const result = await createNewPost(prevState, formData);

        if (result?.message) {
            if (result.success) {
                toast.success(result.message);
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
                <div className="w-full p-3 rounded-md overflow-y-auto h-full lg:h-[550px]">
                    <h2 className="text-center text-sm lg:text-xl font-bold">Faça uma nova postagem no blog</h2>

                    <form action={formAction} className="w-full flex flex-col gap-3 mt-6">
                        <div className="grid grid-cols-1 gap-3">
                            {file ? <Image className="w-full h-24 object-cover rounded-md" src={URL.createObjectURL(file)} width={200} height={200} alt="imagem de upload do post" />
                                :
                                <div className="w-full rounded-md bg-gray-300 h-24" />
                            }
                            <label htmlFor='postImageUrl' className="cursor-pointer text-sm flex items-center justify-center gap-3 font-semibold">Faça upload da imagem do post <FaUpload /></label>
                            <input accept="image/*" type="file" className="hidden" name="postImageUrl" id="postImageUrl" onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="title" className="font-semibold">Titulo</label>
                            <input type="text" className="input" name="title" placeholder="Isso é sobre corgis" />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <select className="input" name="category">
                                <option value='Alimentação'>Alimentação</option>
                                <option value='Treinamento'>Treinamento</option>
                                <option value='Saúde'>Saúde</option>
                                <option value='Curiosidades'>Curiosidades</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <label htmlFor="description">Descrição</label>
                            <SunEditor name="description" height="150" />
                        </div>
                        {formState.message !== '' ?
                            <p className={`${formState.success === false ? 'text-red-600' : 'text-green-600'} font-bold mx-auto`}>{formState.message}</p>
                            : ''
                        }
                        <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600'>
                            {pending ? <Loading /> : 'Enviar'}
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    )
}