'use client';

import Link from "next/link";
import { usePostStore } from "../../hooks/posts/usePostStore";
import { useUserStore } from "../../hooks/user/useUserStore";
import { PostCard, PostSkeleton } from "../postCard";
import { useEffect } from "react";

interface CategoryPostsProps {
    category: string;
}

export function CategoryPosts({ category }: CategoryPostsProps) {
    const { post, loading } = usePostStore();
    const { users, fetchAllUsers } = useUserStore();

    useEffect(() => {
        if (!users) {
            fetchAllUsers();
        }
    }, [users, fetchAllUsers]);

    if (loading || !post) {
        return (
            <section className="container mx-auto px-4 py-20 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Blog</span>
                        <h2 className="text-3xl lg:text-4xl font-extrabold mt-2">
                            Últimas sobre <span className="text-orange-500">{category}</span>
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <PostSkeleton key={i} />
                    ))}
                </div>
            </section>
        )
    }

    // Filter posts by category (case-insensitive just in case)
    const filteredPosts = post.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
    );

    return (
        <section className="container mx-auto px-4 py-20 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">Blog</span>
                    <h2 className="text-3xl lg:text-4xl font-extrabold mt-2">
                        Últimas sobre <span className="text-orange-500">{category}</span>
                    </h2>
                </div>

                {filteredPosts.length > 0 && (
                    <Link href="/" className="text-gray-500 hover:text-orange-500 font-semibold transition-colors flex items-center gap-2">
                        Ver tudo
                        <span className="text-xl">→</span>
                    </Link>
                )}
            </div>

            {filteredPosts.length === 0 ? (
                <div className="text-center py-16 bg-[var(--card-bg)] rounded-3xl border-2 border-dashed border-[var(--card-border)]">
                    <p className="text-gray-500 text-lg">Nenhum post encontrado nesta categoria ainda.</p>
                    <p className="text-sm text-gray-400 mt-2">Fique ligado para novidades!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map(post => {
                        const author = users?.find(u => u.id === post.authorId);
                        return (
                            <PostCard key={post.id} post={post} author={author} />
                        )
                    })}
                </div>
            )}
        </section>
    );
}
