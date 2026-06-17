import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBell, FaLink, FaTimes } from "react-icons/fa";
import { useUserStore } from "../../../hooks/user/useUserStore";
import { useComments } from "../../../hooks/useComments";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NotificationBoxProps {
    theme: string;
}

export function NotificationBox({ theme }: NotificationBoxProps) {
    const { user, users } = useUserStore();

    const { comments, loading} = useComments(user?.id);

    const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);

    const authorIds = new Set(comments?.map(p => p.authorId));

    const authors = users?.filter(user =>
        authorIds.has(user.id)
    );

    const pathname = usePathname();

    useEffect(() => {
        setIsNotificationBoxOpen(false);
    }, [pathname]);

    useGSAP(() => {
        gsap.fromTo('.notification-box', { opacity:0, y:-30 }, { opacity: 1, y:0, duration:0.4, ease:'bounce.out' } )
    }, [isNotificationBoxOpen]);

    return (
        <>
            <button
                onClick={() => setIsNotificationBoxOpen(true)}
                className={`
                    relative cursor-pointer p-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                    ${theme === 'light' 
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                    : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-sm'
                    }
                `}
                aria-label="Notificações"
                >
                <FaBell className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />

                {comments.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    
                    <span className="relative flex rounded-full h-5 w-5 bg-red-600 text-[11px] font-bold text-white items-center justify-center shadow-sm">
                        {comments.length}
                    </span>
                    </span>
                )}
            </button>

            {isNotificationBoxOpen &&
            <div className="notification-box rounded-xl text-black lg:max-w-80 w-full min-h-screen lg:min-h-auto absolute z-9999 top-0 lg:top-10 right-0 bg-white shadow-md">
                <div className="w-full border-b p-3 border-gray-300 flex justify-between">
                    <h4 className=" text-xl font-semibold">Notificações</h4>
                    <span onClick={() => setIsNotificationBoxOpen(false)} className="w-6 h-6 rounded-full text-sm bg-black text-white grid place-items-center cursor-pointer transition-all duration-500 hover:scale-110"><FaTimes /></span>
                </div>
                {comments.map(comment => { 
                    const author = authors?.find((author) => author.id === comment.authorId);
                    return (
                        <div key={comment.id} className="border-b border-gray-300 w-full cursor-pointer p-3 flex gap-3 items-center transition-all duration-500 hover:bg-orange-900 group">
                            <Image src={author?.avatarUrl || '/images/user.jpg'} width={40} height={40} className="w-10 h-10 rounded-full aspect-square object-cover" alt="foto do usuário que comentou sua publicação" />
                            <div className="space-y-1 w-full">
                                <div className="flex justify-between items-center">
                                    <h5 className="font-medium group-hover:text-white">{comment.name || 'John Doe'}</h5>
                                    <Link href={`/post/${comment.postId}`}>
                                        <FaLink className="z-50 cursor-pointer text-blue-300" />
                                    </Link>
                                </div>
                                <p className="text-sm text-gray-400 font-normal line-clamp-1 group-hover:text-white">{comment.content}</p>
                            </div>
                        </div>
                    )})}
            </div>
            }
        </>
    )
}