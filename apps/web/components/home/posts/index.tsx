/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from "../../../hooks/user/useUserStore";
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { Post } from "../../../@types/Post";
import { PostCard, PostSkeleton } from "../../postCard";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import gsap from "gsap";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";
import { useRef } from "react";

interface PostsProps {
    data: Post[] | any;
}

export function Posts({ data }: PostsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { users } = useUserStore();
    const { loading } = usePostStore();

    const authorIds = new Set(data?.map((p: any) => p.authorId));

    const authors = users?.filter(user =>
        authorIds.has(user.id)
    );

    useGSAPAnimate(() => {
        if (!loading && data?.length > 0) {
            gsap.from(".post-card-anim", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: ANIM_CONFIG.duration.medium,
                stagger: 0.1,
                ease: ANIM_CONFIG.easing.base,
                clearProps: "all"
            });
        }
    }, [loading, data]);

    if (loading) {
        return (
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </div>
        )
    }

    return (
        <div ref={containerRef} className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((post: any) => {
                const author = authors?.find(
                    (author) => author.id === post.authorId
                );

                return (
                    <div key={post.id} className="post-card-anim flex flex-col h-full">
                        <PostCard post={post} author={author} />
                    </div>
                );
            })}
        </div>
    )
}