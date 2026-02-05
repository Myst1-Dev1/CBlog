'use client'

import { useState } from 'react';
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { Posts } from "../posts";

export function PostsWithFilter() {
    const [filter, setFilter] = useState('');

    const { post } = usePostStore();

    const postFilteredData = filter === '' ? post : post?.filter(p => p.category === filter);

    return (
        <>
        <div className="mt-4 flex gap-3 flex-wrap">
            <span onClick={() => setFilter('')} className="w-fit px-3 py-2 bg-orange-400 rounded-md text-white font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-600 hover:text-white">Todos</span>
            <span onClick={() => setFilter('Alimentação')} className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Alimentação</span>
            <span onClick={() => setFilter('Treinamento')} className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Treinamento</span>
            <span onClick={() => setFilter('Saúde')} className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Saúde</span>
            <span onClick={() => setFilter('Curiosidades')} className="w-fit px-3 py-2 rounded-md text-black font-semibold cursor-pointer transition-all duration-500 hover:bg-orange-400 hover:text-white">Curiosidades</span>
        </div>
        <Posts data = {postFilteredData} />
        </>
    )
}