/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUserStore } from "../../../hooks/user/useUserStore";
import { Post } from "../../../@types/Post";

interface PostsProps {
    data: Post[] | any;
}

export function Posts({ data }:PostsProps) {
    const { users } = useUserStore();

    const authorIds = new Set(data?.map((p:any) => p.authorId));

    const authors = users?.filter(user =>
        authorIds.has(user.id)
    );
    
    return (
        <>
            <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {data?.map((data: any) => {
                    const author = authors?.find(
                        (author) => author.id === data.authorId
                    );

                    return (
                        <div key={data.id} className="max-w-96 w-full relative">
                            <Image
                                className="w-full h-52 mb-2 rounded-md object-cover"
                                src={data.postImageUrl || "/images/corgi.webp"}
                                width={400}
                                height={400}
                                alt="foto do post"
                            />

                            <span className="text-gray-500 text-xs">
                                {new Date(data.createdAt).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>

                            <h3 className="text-xl lg:text-2xl font-semibold">
                                {data.title}
                            </h3>

                            <div
                                className="text-gray-500 font-thin line-clamp-2 text-sm"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />

                            <Link
                                href={`post/${data.id}`}
                                className="flex items-center mt-2 gap-3 font-semibold w-fit p-2 transition-all duration-500 hover:bg-orange-400 hover:text-white"
                            >
                                Ver Mais <FaArrowRightLong />
                            </Link>

                            {author && (
                                <div className="mt-5 flex items-center gap-3">
                                <Image
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={author.avatarUrl || "/images/user.jpg"}
                                    width={32}
                                    height={32}
                                    alt="foto do autor"
                                />
                                <span className="font-medium">{author.username}</span>
                                </div>
                            )}

                            <span className="text-white p-2 text-sm absolute top-3 left-3 w-fit bg-black/60 rounded-full">
                                {data.category}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    )
}