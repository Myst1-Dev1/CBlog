'use client'

import { useState } from 'react';
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { Posts } from "../posts";
import gsap from 'gsap';

export function PostsWithFilter() {
    const [filter, setFilter] = useState('');

    const { post } = usePostStore();

    const postFilteredData = filter === '' ? post : post?.filter(p => p.category === filter);

    const handleFilterClick = (e: React.MouseEvent<HTMLSpanElement>, category: string) => {
        setFilter(category);
        gsap.to(e.currentTarget, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    };

    return (
        <>
            <div className="mt-4 flex gap-3 flex-wrap">
                <span onClick={(e) => handleFilterClick(e, '')} className={`w-fit px-3 py-2 ${filter === '' ? 'bg-orange-400 text-white shadow-md' : 'bg-transparent border border-gray-200'} rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:text-white`}>Todos</span>
                <span onClick={(e) => handleFilterClick(e, 'Alimentação')} className={`w-fit px-3 py-2 ${filter === 'Alimentação' ? 'bg-orange-400 text-white shadow-md' : 'bg-transparent border border-gray-200'} rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:text-white`}>Alimentação</span>
                <span onClick={(e) => handleFilterClick(e, 'Treinamento')} className={`w-fit px-3 py-2 ${filter === 'Treinamento' ? 'bg-orange-400 text-white shadow-md' : 'bg-transparent border border-gray-200'} rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:text-white`}>Treinamento</span>
                <span onClick={(e) => handleFilterClick(e, 'Saúde')} className={`w-fit px-3 py-2 ${filter === 'Saúde' ? 'bg-orange-400 text-white shadow-md' : 'bg-transparent border border-gray-200'} rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:text-white`}>Saúde</span>
                <span onClick={(e) => handleFilterClick(e, 'Curiosidades')} className={`w-fit px-3 py-2 ${filter === 'Curiosidades' ? 'bg-orange-400 text-white shadow-md' : 'bg-transparent border border-gray-200'} rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-orange-600 hover:text-white`}>Curiosidades</span>
            </div>
            <Posts data={postFilteredData} />
        </>
    )
}