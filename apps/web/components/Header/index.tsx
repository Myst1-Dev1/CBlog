"use client";
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="z-50 flex justify-between items-center container py-6 absolute top-0 left-0 right-0 text-white">
            <h1 className="text-2xl font-bold">Corgi Blog</h1>

            <nav className="hidden md:flex items-center gap-6">
                <Link href="/alimentacao" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500">Alimentação</Link>
                <Link href="/treinamento" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500">Treinamento</Link>
                <Link href="/saude" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500">Saúde</Link>
                <Link href="/curiosidades" className="font-semibold text-[15px] transition-all duration-300 hover:text-orange-500">Curiosidades</Link>
            </nav>

            <div className="max-w-72 w-full p-2 rounded-md bg-[#ffffff56] hidden md:flex items-center gap-3">
                <input
                    type="text"
                    className="w-full border-none outline-none font-semibold bg-transparent placeholder-white"
                    placeholder="Pesquisar..."
                />
                <FaSearch className="text-white" />
            </div>

            <div className="hidden md:flex items-center gap-4">
                <span className="p-3 font-semibold transition-all duration-500 rounded-md cursor-pointer hover:bg-orange-500">Login</span>
                <button className="bg-white w-fit p-3 rounded-md font-semibold cursor-pointer transition-all text-black duration-500 hover:bg-orange-500 hover:text-white">Cadastro</button>
            </div>

            <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
                {open ? <FaTimes /> : <FaBars />}
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/60 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-black text-white z-50 transform ${
                    open ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out md:hidden`}
            >
                <div className="flex flex-col gap-6 p-6">
                    <h2 className="text-xl font-bold">Corgi Blog</h2>
                    <FaTimes className="absolute top-6 right-2 text-xl cursor-pointer text-white" onClick={() => setOpen(false)}/>
                    <nav className="flex flex-col gap-4">
                        <Link href="/" onClick={() => setOpen(false)} className="font-semibold text-lg transition-all duration-300 hover:text-orange-500">Alimentação</Link>
                        <Link href="/" onClick={() => setOpen(false)} className="font-semibold text-lg transition-all duration-300 hover:text-orange-500">Treinamento</Link>
                        <Link href="/" onClick={() => setOpen(false)} className="font-semibold text-lg transition-all duration-300 hover:text-orange-500">Saúde</Link>
                        <Link href="/" onClick={() => setOpen(false)} className="font-semibold text-lg transition-all duration-300 hover:text-orange-500">Curiosidades</Link>
                    </nav>

                    <div className="w-full p-2 rounded-md bg-[#ffffff56] flex items-center gap-3">
                        <input
                            type="text"
                            className="w-full border-none outline-none font-semibold bg-transparent placeholder-white"
                            placeholder="Pesquisar..."
                        />
                        <FaSearch className="text-white" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="p-3 font-semibold text-center transition-all duration-300 rounded-md cursor-pointer hover:bg-orange-500">Login</span>
                        <button className="bg-white w-full py-3 rounded-md font-semibold cursor-pointer transition-all text-black duration-300 hover:bg-orange-500 hover:text-white">
                            Cadastro
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
