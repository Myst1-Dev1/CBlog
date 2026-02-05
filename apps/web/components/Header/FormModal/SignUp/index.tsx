import React, { useActionState, useState } from 'react';
import { FaUpload, FaUser } from "react-icons/fa";
import { Register } from '../../../../actions/signActions';
import Image from 'next/image';
import { Loading } from '../../../Loading';
import { toast } from 'react-toastify';

interface SignUpProps {
    setFormType: React.Dispatch<React.SetStateAction<"signIn" | "signUp">>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SignUp({ setFormType, setIsModalOpen }:SignUpProps) {
    const [formState, formAction, pending] = useActionState(handleRegister, { success: false });
    const [file, setFile] = useState<File | null>(null);

    async function handleRegister(prevState: any, formData: FormData) {
            const result = await Register(prevState, formData);
    
            if (result?.message) {
                if (result.success) {
                    toast.success(result.message);
                    setIsModalOpen(false);
                    setFile(null);
                } else {
                    toast.error(result.message)
                }
            }
    
            return result;
        }

    return (
        <>
            <div className='p-4'>
                <h2 className='text-xl text-center font-bold'>Faça seu cadastro</h2>
                <form action={formAction} className='mt-5 max-w-md w-full grid grid-cols-1 mx-auto gap-3'>
                    <div className='grid grid-cols-1 gap-3'>
                        {file ?
                            <Image className='rounded-full aspect-square mx-auto object-cover' src={URL.createObjectURL(file)} width={64} height={64} alt='foto que o usuário fez upload' />
                            :
                            <div className='text-3xl rounded-full text-white grid place-items-center w-16 h-16 bg-black mx-auto'>
                                <FaUser />
                            </div>
                        }
                        <div className='flex items-center justify-center mb-4 gap-3'>
                            <span className='font-semibold'>Faça upload de uma imagem de avatar</span>
                            <label htmlFor="image" className='cursor-pointer'>
                                <FaUpload />
                            </label>
                        </div>
                        <input type="file" className='hidden' name='image' id='image' onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="username" className='font-semibold'>Nome de usuário</label>
                            <input type="text" id='username' name='username' className='input' placeholder='John' />
                        </div>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input type="email" id='email' name='email' className='input' placeholder='john@gmail.com' />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="password" className='font-semibold'>Senha</label>
                            <input type="password" id='password' name='password' className='input' placeholder='********' />
                        </div>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="confirm_password" className='font-semibold'>Confirme a senha</label>
                            <input type="password" id='confirm_password' name='confirm_password' className='input' placeholder='********' />
                        </div>
                    </div>
                    {formState.message !== '' ?
                        <p className={`${formState.success === false ? 'text-red-600' : 'text-green-600'} font-bold mx-auto`}>{formState.message}</p>
                        : ''
                    }
                    <span className='text-center'>Já possui uma conta? <span onClick={() => setFormType('signIn')} className='font-bold text-orange-400 cursor-pointer'>Entrar</span></span>
                    <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600'>
                        {pending ? <Loading /> : 'Cadastro'}
                    </button>
                </form>
            </div>
        </>
    )
}