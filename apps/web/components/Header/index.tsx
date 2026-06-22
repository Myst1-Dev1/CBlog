"use client";

import Link from "next/link";
import { FaUserCircle, FaSignOutAlt, FaHome } from "react-icons/fa";
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
            <header
                ref={headerRef}
                className="relative z-50 border-b border-white/10 bg-[linear-gradient(180deg,rgba(12,10,9,0.98),rgba(20,15,12,0.96))] px-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:px-12"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_30%)] pointer-events-none" />

                <div className="relative mx-auto flex max-w-7xl items-center justify-between py-4 lg:py-5">
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10 text-[#f7c98b] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:-translate-y-0.5">
                            <FaHome className="text-lg" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-black tracking-tight sm:text-xl">Corgi Blog</span>
                            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/45">Editorial de patinhas</span>
                        </div>
                    </Link>

                    {isLogged ? loading ? 'Carregando...' :
                        <div className="hidden items-center gap-3 md:flex">
                            <NotificationBox />
                            <Link
                                href="/perfil"
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                            >
                                <FaUserCircle className="text-xl" />
                                Perfil
                            </Link>
                            <button
                                onClick={() => {
                                    clearUser();
                                    redirect('/');
                                }}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:bg-[#E58E35]/10 hover:text-[#f7c98b]"
                                aria-label="Sair"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>
                        :
                        <div className="hidden items-center gap-3 md:flex">
                            <span
                                onClick={() => { setIsModalOpen(true); setFormType('signIn') }}
                                className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                            >
                                Login
                            </span>
                            <button
                                onClick={() => { setIsModalOpen(true); setFormType('signUp') }}
                                className="rounded-full bg-[#E58E35] px-5 py-2.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(229,142,53,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d97a16]"
                            >
                                Cadastro
                            </button>
                        </div>
                    }

                    <div className="flex items-center gap-3 md:hidden">
                        {user ?
                            <>
                                <NotificationBox />
                                <Link
                                    href="/perfil"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                    aria-label="Perfil"
                                >
                                    <FaUserCircle className="text-2xl" />
                                </Link>
                                <button
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#E58E35]/30 hover:bg-[#E58E35]/10 hover:text-[#f7c98b]"
                                    onClick={clearUser}
                                    aria-label="Sair"
                                >
                                    <FaSignOutAlt />
                                </button>
                            </>
                            :
                            <>
                                <button
                                    onClick={() => { setIsModalOpen(true); setFormType('signIn') }}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/85 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { setIsModalOpen(true); setFormType('signUp') }}
                                    className="rounded-full bg-[#E58E35] px-4 py-2.5 text-sm font-bold text-white shadow-[0_16px_32px_rgba(229,142,53,0.24)] transition-all duration-300 hover:bg-[#d97a16]"
                                >
                                    Cadastro
                                </button>
                            </>
                        }
                    </div>
                </div>
            </header>
            <FormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formType={formType} setFormType={setFormType} />
        </>
    );
}
