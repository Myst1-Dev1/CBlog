/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from "../../../hooks/user/useUserStore";
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { Post } from "../../../@types/Post";
import { PostCard, PostSkeleton } from "../../postCard";

interface PostsProps {
    data: Post[] | any;
}

export function Posts({ data }: PostsProps) {
    const { users } = useUserStore();
    const { loading } = usePostStore();

    const authorIds = new Set(data?.map((p: any) => p.authorId));

    const authors = users?.filter(user =>
        authorIds.has(user.id)
    );

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
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((post: any) => {
                const author = authors?.find(
                    (author) => author.id === post.authorId
                );

                return (
                    <PostCard key={post.id} post={post} author={author} />
                );
            })}
        </div>
    )
}