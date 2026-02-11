export * from './Skeleton';
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Post } from "../../@types/Post";
import { User } from "../../hooks/user/useUserStore";
import { useRef } from "react";
import gsap from "gsap";

interface PostCardProps {
    post: Post;
    author?: User;
}

export function PostCard({ post, author }: PostCardProps) {
    const arrowRef = useRef<SVGElement>(null);

    const htmlToText = (html: string) => {
        if (!html) return '';

        const div = document.createElement('div');
        div.innerHTML = html;

        return div.textContent || div.innerText || '';
    };

    const handleMouseEnter = () => {
        gsap.to(arrowRef.current, {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(arrowRef.current, {
            x: 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group bg-[var(--card-bg)] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--card-border)] overflow-hidden flex flex-col h-full hover:-translate-y-1"
        >
            {/* Image Area */}
            <div className="relative h-60 overflow-hidden">
                <Image
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={post.postImageUrl || "/images/corgi.webp"}
                    width={500}
                    height={300}
                    alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full shadow-sm text-gray-900">
                    {post.category}
                </span>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                        <FaCalendarAlt />
                        <span>30 Jan, 2025</span>
                    </div>
                </div>

                <Link href={`/post/${post.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                    {htmlToText(post.description)}
                </p>


                <div className="pt-6 border-t border-[var(--card-border)] flex items-center justify-between mt-auto">
                    {/* Author Info */}
                    {author ? (
                        <div className="flex items-center gap-2.5">
                            <Image
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                src={author.avatarUrl || "/images/user.jpg"}
                                width={32}
                                height={32}
                                alt={author.username}
                            />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-[var(--foreground)]">{author.username}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                            <span className="text-xs text-gray-400">Carregando...</span>
                        </div>
                    )}

                    <Link
                        href={`/post/${post.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors group/link"
                    >
                        Ler mais
                        <span ref={arrowRef as any} className="inline-block transition-transform">
                            <FaArrowRightLong />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
