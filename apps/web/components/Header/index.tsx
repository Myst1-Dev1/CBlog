"use client";

import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { FormModal } from "./FormModal";
import { useUserStore } from "../../hooks/user/useUserStore";
import { redirect, usePathname } from "next/navigation";

import Cookies from 'js-cookie';
import { useThemeStore } from "../../hooks/useThemeStore";
import { useGSAPAnimate } from "../../hooks/useGSAPAnimate";
import gsap from "gsap";
import { ANIM_CONFIG } from "../../utils/gsapConfig";

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const { user, clearUser, loading } = useUserStore();
    const { theme } = useThemeStore();

    const path = usePathname();

    const [open, setOpen] = useState(false);
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

    // Animação do Menu Mobile
    useGSAPAnimate(() => {
        if (open) {
            const tl = gsap.timeline();

            tl.fromTo(mobileMenuRef.current,
                { x: "100%", opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out"
                }
            );

            tl.fromTo(".mobile-nav-item",
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.2)", delay: 0.2 }
            );
        }
    }, [open]);

    return (
        <>
            <header ref={headerRef} className={`z-30 flex justify-between items-center container py-6 absolute top-0 left-0 right-0 ${path === '/' || path.startsWith('/perfil') || path.startsWith('/post') ? 'text-white' : 'text-black'} ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-300">Corgi Blog</Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/alimentacao" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Alimentação</Link>
                    <Link href="/treinamento" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Treinamento</Link>
                    <Link href="/saude" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500 hover:-translate-y-0.5">Saúde</Link>
                </nav>

                {isLogged ? loading ? 'Carregando...' :
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/perfil" className="hover:scale-110 transition-transform duration-300">
                            <FaUserCircle className="text-3xl cursor-pointer" />
                        </Link>
                        <FaSignOutAlt onClick={() => {
                            clearUser();
                            redirect('/');
                        }} className="cursor-pointer transition-all duration-500 hover:text-orange-400 hover:scale-110" />
                    </div>
                    :
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <span onClick={() => { setIsModalOpen(true); setFormType('signIn') }} className="p-3 font-semibold transition-all duration-500 rounded-md cursor-pointer hover:bg-orange-500 hover:text-white">Login</span>
                        <button onClick={() => { setIsModalOpen(true); setFormType('signUp') }} className="bg-white w-fit p-3 rounded-md font-semibold cursor-pointer transition-all text-black duration-500 hover:bg-orange-500 hover:text-white hover:scale-105">Cadastro</button>
                    </div>
                }

                <div className="flex md:hidden gap-4">
                    {user ?
                        <FaUserCircle className="text-3xl cursor-pointer" />
                        : ''
                    }
                    <ThemeToggle />
                    <button className="text-2xl" onClick={() => setOpen(!open)}>
                        {open ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* {open && (
                    <div
                        className="fixed inset-0 bg-black/60 md:hidden z-40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                )} */}

                {open &&
                    <div
                        ref={mobileMenuRef}
                        className={`fixed top-0 right-0 h-screen w-full bg-black/70 text-white z-40 md:hidden`}
                        style={{ transform: open ? 'none' : 'translateX(100%)' }}
                    >
                        <div className="flex flex-col gap-6 p-6">
                            <Link onClick={() => setOpen(false)} href="/">
                                <h2 className="text-xl font-bold mobile-nav-item">Corgi Blog</h2>
                            </Link>
                            <FaTimes className="absolute top-6 right-2 z-50 text-xl cursor-pointer text-white mobile-nav-item" onClick={() => setOpen(false)} />
                            <nav className="flex flex-col gap-4">
                                <Link href="/alimentacao" onClick={() => setOpen(false)} className="mobile-nav-item font-semibold text-lg transition-all duration-300 hover:text-orange-500">Alimentação</Link>
                                <Link href="/treinamento" onClick={() => setOpen(false)} className="mobile-nav-item font-semibold text-lg transition-all duration-300 hover:text-orange-500">Treinamento</Link>
                                <Link href="/saude" onClick={() => setOpen(false)} className="mobile-nav-item font-semibold text-lg transition-all duration-300 hover:text-orange-500">Saúde</Link>
                            </nav>

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
                }
            </header>
            <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formType={formType} setFormType={setFormType} />
        </>
    );
}
