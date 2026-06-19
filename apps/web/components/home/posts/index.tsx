'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import { Post } from "../../../@types/Post";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { useUserStore } from "../../../hooks/user/useUserStore";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";
import { PostCard } from "../../postCard";

interface PostsProps {
  data: Post[] | any;
}

export function Posts({ data }: PostsProps) {
  const { users } = useUserStore();
  const sectionRef = useRef<HTMLElement>(null);

  const recentPosts = useMemo(
    () =>
      [...(data ?? [])].sort((a: any, b: any) => {
        const aDate = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b?.createdAt ? new Date(b.createdAt).getTime() : 0;

        return bDate - aDate;
      }),
    [data]
  );

  const htmlToText = (html: string) => {
    if (!html) return "";

    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent || div.innerText || "";
  };

  const featuredPost = recentPosts[0];
  const morePosts = recentPosts.slice(1);

  const authorIds = new Set(recentPosts?.map((post: any) => post.authorId));
  const authors = users?.filter((user) => authorIds.has(user.id));
  const categoryCount = new Set(recentPosts?.map((post: any) => post.category)).size;
  const authorCount = authors?.length ?? 0;

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      gsap.from(".posts-kicker", {
        opacity: 0,
        y: 20,
        duration: ANIM_CONFIG.duration.medium,
      });

      gsap.from(".posts-stats > *", {
        opacity: 0,
        y: 18,
        duration: ANIM_CONFIG.duration.medium,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".posts-featured", {
        opacity: 0,
        y: 40,
        duration: ANIM_CONFIG.duration.slow,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".post-card-anim", {
        opacity: 0,
        y: 42,
        duration: ANIM_CONFIG.duration.slow,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [recentPosts.length, authorCount], sectionRef);

  return (
    <section
      id="latest-posts"
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-12 transition-colors duration-300 md:py-16 bg-[linear-gradient(180deg,_rgba(12,10,9,0.98),_rgba(23,17,13,0.94))]
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#E58E35]/10 to-transparent" />

      <div className="container relative z-10 mx-auto space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="posts-kicker inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:bg-stone-900/60 dark:text-amber-200">
              Biblioteca em destaque
            </span>
            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight text-[#7a4308] sm:text-4xl lg:text-5xl dark:text-amber-100">
                Leituras recentes com cara de capa principal
              </h2>
              <p className={`max-w-xl text-base leading-relaxed text-stone-400`}>
                A curadoria do CorgiBlog ganhou uma apresentação mais cinematográfica: o post mais recente vira destaque e o restante entra em uma grade fluida, pronta para explorar.
              </p>
            </div>
          </div>

          <Link
            href="/posts"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-[#E58E35]/20 bg-white/75 px-5 py-3 text-sm font-bold text-[#8E4F00] shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/40 hover:bg-white dark:bg-stone-900/55 dark:text-amber-100"
          >
            Ver todas as postagens <FaArrowRight />
          </Link>
        </div>

        <div className="posts-stats grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Posts</p>
            <p className="mt-2 text-3xl font-black text-[#6f3c07] dark:text-white">{recentPosts.length}</p>
            <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">artigos prontos para leitura</p>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Categorias</p>
            <p className="mt-2 text-3xl font-black text-[#6f3c07] dark:text-white">{categoryCount}</p>
            <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">temas para navegar sem pressa</p>
          </div>
          <div className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Autores</p>
            <p className="mt-2 text-3xl font-black text-[#6f3c07] dark:text-white">{authorCount}</p>
            <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">vozes diferentes da equipe</p>
          </div>
        </div>

        {featuredPost ? (
          <div className="posts-featured overflow-hidden rounded-[34px] border border-white/70 bg-white/85 shadow-[0_24px_70px_rgba(119,74,21,0.12)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/75">
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8">
                <div className="space-y-4">
                  <span className="inline-flex w-fit rounded-full bg-[#E58E35]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8E4F00] dark:text-amber-200">
                    Destaque principal
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black leading-tight text-[#6f3c07] dark:text-white md:text-3xl">
                      {featuredPost.title}
                    </h3>
                    <p className={`text-sm leading-relaxed text-stone-400 line-clamp-3`}>
                      {htmlToText(featuredPost.description)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-3 py-1 text-xs font-semibold text-[#8E4F00] dark:text-amber-200">
                    {featuredPost.category}
                  </span>
                  <span className={`text-xs font-medium text-stone-500`}>
                    Última atualização da home
                  </span>
                </div>
              </div>

              <div className="relative lg:col-span-7 min-h-[320px]">
                <Image
                  src={featuredPost.postImageUrl || "/images/corgi.webp"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/10 to-transparent" />
                <Link
                  href={`/post/${featuredPost.id}`}
                  className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#6f3c07] shadow-lg transition-transform duration-300 hover:-translate-y-0.5 dark:bg-stone-950/80 dark:text-amber-100"
                >
                  Ler destaque
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[34px] border border-dashed border-[#E58E35]/25 bg-white/70 p-10 text-center backdrop-blur dark:bg-stone-900/50">
            <p className="text-lg font-bold text-[#6f3c07] dark:text-amber-100">Nenhum post encontrado</p>
            <p className={`mt-2 text-sm text-stone-400`}>
              Quando houver conteúdo novo, ele aparece aqui com um destaque especial.
            </p>
          </div>
        )}

        {morePosts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {morePosts.map((post: any) => {
              const author = authors?.find((item) => item.id === post.authorId);

              return (
                <div key={post.id} className="post-card-anim flex h-full flex-col">
                  <PostCard post={post} author={author} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
