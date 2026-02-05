import React, { useActionState } from 'react';
import { Modal } from '../../Modal';
import { Login } from '../../../actions/signActions';
import { SignUp } from './SignUp';
import { Loading } from '../../Loading';
import { toast } from 'react-toastify';

interface FormModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formType: string;
    setFormType: React.Dispatch<React.SetStateAction<"signIn" | "signUp">>;
}

export function FormModal({ isModalOpen, setIsModalOpen, formType, setFormType }:FormModalProps) {
    const [formState, formAction, pending] = useActionState(handleLogin, { success: false });

    async function handleLogin(prevState: any, formData: FormData) {
        const result = await Login(prevState, formData);

        if (result?.message) {
            if (result.success) {
                toast.success(result.message);
                setIsModalOpen(false);

            } else {
                toast.error(result.message);
            }
        }

        return result;
    }

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
                        {formState.message !== '' ?
                            <p className={`${formState.success === false ? 'text-red-600' : 'text-green-600'} font-bold mx-auto`}>{formState.message}</p>
                            : ''
                        }
                        <span className='text-center'>Não possui uma conta? <span onClick={() => setFormType('signUp')} className='font-bold text-orange-400 cursor-pointer'>Cadastro</span></span>
                        <button className='bg-orange-500 cursor-pointer font-semibold text-xl mt-3 text-white p-3 rounded-md w-full transition-all duration-500 hover:bg-orange-600'>
                            {pending ? <Loading /> : 'Entrar'}
                        </button>
                    </form>
                </div>
                }

                {formType === 'signUp' &&
                    <SignUp setFormType={setFormType} setIsModalOpen={setIsModalOpen} />
                }
            </Modal>
        </>
    )
}