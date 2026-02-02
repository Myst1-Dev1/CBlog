import { useState, useActionState } from 'react';
import { Modal } from '../../Modal';
import { FaUpload, FaUser } from 'react-icons/fa';
import { Login } from '../../../actions/signActions';

interface FormModalProps {
    isModalOpen: boolean;
    setIsModalOpen:any;
}

export function FormModal({ isModalOpen, setIsModalOpen }:FormModalProps) {
    const [formState, formAction, pending] = useActionState(Login, { success: false });

    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');

    return (
        <>
            <Modal isOpen={isModalOpen} setisOpen={setIsModalOpen} maxWidth='max-w-[500px]'>
                {formType === 'signIn' &&
                <div className='p-4'>
                    <h2 className='text-xl text-center font-bold'>Faça seu login</h2>
                    <form action={formAction} className='mt-5 max-w-md w-full grid grid-cols-1 mx-auto gap-3'>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input type="email" id='email' name='email' className='input' placeholder='john@gmail.com' />
                        </div>
                        <div className='grid grid-cols-1 gap-3'>
                            <label htmlFor="password" className='font-semibold'>Senha</label>
                            <input type="password" id='password' name='password' className='input' placeholder='********' />
                        </div>
                        {formState.message}
                        <span className='text-center'>Não possui uma conta? <span onClick={() => setFormType('signUp')} className='font-bold text-orange-400 cursor-pointer'>Cadastro</span></span>
                        <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600'>
                            {pending ? 'loading...' : 'Entrar'}
                        </button>
                    </form>
                </div>
                }

                {formType === 'signUp' &&
                <div className='p-4'>
                    <h2 className='text-xl text-center font-bold'>Faça seu cadastro</h2>
                    <form action="" className='mt-5 max-w-md w-full grid grid-cols-1 mx-auto gap-3'>
                        <div className='grid grid-cols-1 gap-3'>
                            <div className='text-3xl rounded-full text-white grid place-items-center w-16 h-16 bg-black mx-auto'>
                                <FaUser />
                            </div>
                            <div className='flex items-center justify-center mb-4 gap-3'>
                                <span className='font-semibold'>Faça upload de uma imagem de avatar</span>
                                <label htmlFor="image" className='cursor-pointer'>
                                    <FaUpload />
                                </label>
                            </div>
                            <input type="file" className='hidden' name='image' id='image' />
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
                        <span className='text-center'>Já possui uma conta? <span onClick={() => setFormType('signIn')} className='font-bold text-orange-400 cursor-pointer'>Entrar</span></span>
                        <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600'>Cadastro</button>
                    </form>
                </div>
                }
            </Modal>
        </>
    )
}