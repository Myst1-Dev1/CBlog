"use client";

import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import { FormModal } from "./FormModal";
import { useUserStore } from "../../hooks/user/useUserStore";
import { redirect } from "next/navigation";

import Cookies from 'js-cookie';
import { useGSAPAnimate } from "../../hooks/useGSAPAnimate";
import gsap from "gsap";
import { ANIM_CONFIG } from "../../utils/gsapConfig";
import { NotificationBox } from "./NotificationBox";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const { user, clearUser, loading } = useUserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');

    const isLogged = Cookies.get('user');

    // Animação de entrada do Header
    useGSAPAnimate(() => {
        gsap.from(headerRef.current, {
            y: -50,
            opacity: 0,
            duration: ANIM_CONFIG.duration.medium,
            ease: ANIM_CONFIG.easing.base,
            delay: 0.2
        });
    }, []);
   

    return (
        <>
            <header ref={headerRef} className={`relative z-50 lg:px-12 px-4 bg-black shadow-sm shadow-orange-100/70 flex justify-between items-center py-6 text-white`}>
                <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-300">Corgi Blog</Link>

                {/* <nav className="hidden md:flex items-center gap-6">
                    <Link href="/alimentacao" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Alimentação</Link>
                    <Link href="/treinamento" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Treinamento</Link>
                    <Link href="/saude" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Saúde</Link>
                </nav> */}

                {isLogged ? loading ? 'Carregando...' :
                    <div className="hidden md:flex items-center gap-3">
                        {/* <ThemeToggle /> */}
                        <NotificationBox  />
                        <Link href="/perfil" className="hover:scale-110 transition-transform duration-300">
                            <FaUserCircle className="text-3xl cursor-pointer" />
                        </Link>
                        <FaSignOutAlt onClick={() => {
                            clearUser();
                            redirect('/');
                        }} className="cursor-pointer transition-all duration-500 hover:text-orange-400 hover:scale-110" />
                    </div>
                    :
                    <div className="flex items-center gap-4 ml-auto">
                        {/* <ThemeToggle /> */}
                        <span onClick={() => { setIsModalOpen(true); setFormType('signIn') }} className="p-3 font-semibold transition-all duration-500 rounded-md cursor-pointer hover:bg-orange-500 hover:text-white">Login</span>
                        <button onClick={() => { setIsModalOpen(true); setFormType('signUp') }} className="bg-orange-400 text-white w-fit p-3 rounded-md font-semibold cursor-pointer transition-all text-black duration-500 hover:bg-orange-500 hover:text-white hover:scale-105">Cadastro</button>
                    </div>
                }

                <div className="flex md:hidden gap-4">
                    {/* <ThemeToggle /> */}
                    {user ?
                        <>
                            <NotificationBox />
                            <Link href="/perfil">
                                <FaUserCircle className="text-3xl cursor-pointer" />
                            </Link>
                            <button className="text-2xl z-[70]" onClick={clearUser}>
                                <FaSignOutAlt />
                            </button>
                        </>
                        : ''
                    }
                </div>

                {/* {open &&
                    <div
                        ref={mobileMenuRef}
                        className={`fixed top-0 right-0 h-screen w-full bg-black/70 min-h-screen text-white z-[60] inset-0 md:hidden`}
                        style={{ transform: open ? 'none' : 'translateX(100%)' }}
                    >
                        <div className="flex flex-col gap-6 p-6">
                            <div className="flex flex-col gap-4">
                                {user ?
                                    <button onClick={clearUser} className="mobile-nav-item border border-white w-full py-3 rounded-md font-semibold cursor-pointer transition-all text-white duration-300 hover:bg-orange-500 hover:border-orange-500">Sair</button>
                                    :
                                    <>
                                        <span onClick={() => { setIsModalOpen(true); setOpen(false); setFormType('signIn') }} className="mobile-nav-item p-3 font-semibold text-center transition-all duration-300 rounded-md cursor-pointer hover:bg-orange-500">Login</span>
                                        <button onClick={() => { setIsModalOpen(true); setOpen(false); setFormType('signUp') }} className="mobile-nav-item bg-white w-full py-3 rounded-md font-semibold cursor-pointer transition-all text-black duration-300 hover:bg-orange-500 hover:text-white">
                                            Cadastro
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                } */}
            </header>
            <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formType={formType} setFormType={setFormType} />
        </>
    );
}
