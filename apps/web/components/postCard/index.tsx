export * from './Skeleton';

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import gsap from "gsap";
import { Post } from "../../@types/Post";
import { User } from "../../hooks/user/useUserStore";

interface PostCardProps {
  post: Post;
  author?: User;
}

export function PostCard({ post, author }: PostCardProps) {
  const arrowRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const htmlToText = (html: string) => {
    if (!html) return "";

    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent || div.innerText || "";
  };

  const handleMouseEnter = () => {
    gsap.to(arrowRef.current, {
      x: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const resetTilt = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        resetTilt();
      }}
      onMouseMove={handleMove}
      className="group h-full overflow-hidden rounded-[30px] border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(119,74,21,0.1)] transition-transform duration-300 hover:-translate-y-1 dark:border-stone-800/70 dark:bg-stone-900/80"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={post.postImageUrl || "/images/corgi.webp"}
          width={500}
          height={300}
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#6f3c07] shadow-sm backdrop-blur dark:bg-stone-950/80 dark:text-amber-100">
          {post.category}
        </span>
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
            <FaCalendarAlt />
            <span>Atualizado recentemente</span>
          </div>
          <span className="rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8E4F00] dark:text-amber-200">
            Leitura rápida
          </span>
        </div>

        <Link href={`/post/${post.id}`} className="block">
          <h3 className="line-clamp-2 text-xl font-black leading-tight text-[#6f3c07] transition-colors group-hover:text-[#E58E35] dark:text-white">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {htmlToText(post.description)}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/70 pt-5 dark:border-stone-800/70">
          {author ? (
            <div className="flex items-center gap-2.5">
              <Image
                className="h-9 w-9 rounded-full object-cover border border-white/80 dark:border-stone-700"
                src={author.avatarUrl || "/images/user.jpg"}
                width={36}
                height={36}
                alt={author.username}
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#6f3c07] dark:text-white">{author.username}</span>
                <span className="text-[11px] text-stone-400">Autor convidado</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-stone-100 animate-pulse dark:bg-stone-800" />
              <span className="text-xs text-stone-400">Carregando...</span>
            </div>
          )}

          <Link
            href={`/post/${post.id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#E58E35] transition-colors hover:text-[#c96e0f]"
          >
            Ler mais
            <span ref={arrowRef} className="inline-block">
              <FaArrowRightLong />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
