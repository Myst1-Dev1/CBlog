'use client';

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { Post } from "../../../@types/Post";

interface IntroProps {
  data: Post[] | any;
}

export function Intro({ data }:IntroProps) {
  const rootRef = useRef<HTMLElement>(null);

  const postEmphasis = data.slice(0, 1);

  const fallbackPost = {
    authorId: 1,
      category: "Alimentação",
      createdAt: "2026-06-17T01:18:48.350Z",
      description: "<p>alimentar bem um corgi não é algo facil.</p>",
      id: 1,
      postImageUrl:"/images/Happy-Corgi.webp",
      title: "A alimentação de um corgi, saiba os cuidados com o seu pequenino."
  };

const postsToRender =
  postEmphasis.length === 0 ? [fallbackPost] : postEmphasis;

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".intro-kicker", { y: 18, opacity: 0, duration: 0.5 })
        .from(
          ".intro-title span",
          {
            y: 26,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.18"
        )
        .from(".intro-copy", { y: 18, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(".intro-actions", { y: 16, opacity: 0, duration: 0.45 }, "-=0.3")
        .from(
          ".intro-stats > *",
          {
            y: 18,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.25"
        )
        .from(".intro-visual", { x: 40, opacity: 0, duration: 0.75 }, "-=0.7")
        .from(
          ".intro-visual-float",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.45"
        );

      gsap.to(".intro-orb", {
        y: -14,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [], rootRef);

  return (
    <section
      ref={rootRef}
      className={`bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.14),_transparent_35%),linear-gradient(180deg,_rgba(28,25,23,0.92),_rgba(12,10,9,0.98))] relative z-10 overflow-hidden px-4 py-10 transition-colors duration-300 md:py-14`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="intro-orb absolute -left-10 top-6 h-32 w-32 rounded-full bg-[#E58E35]/20 blur-3xl" />
        <div className="intro-orb absolute right-0 top-28 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      {postsToRender?.map((post:any) => {
        const words = post.title?.split(" ");

        return (
        <div key={post.id} className="container relative z-10 mx-auto grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            <span className="intro-kicker inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/20 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:bg-stone-900/60 dark:text-amber-200">
              {post.category}
            </span>

            <div className="space-y-5">
              <h1 className="intro-title max-w-2xl text-4xl font-black leading-[0.95] tracking-tight text-[#6f3c07] sm:text-5xl lg:text-7xl dark:text-amber-100">
                <span className="block">
                  {words?.slice(0, 2).join(" ")}
                </span>

                <span className="mt-2 block bg-gradient-to-r from-[#E58E35] via-[#f2a34f] to-[#8E4F00] bg-clip-text text-transparent">
                  {words?.slice(2).join(" ")}
                </span>
              </h1>

              <p 
                dangerouslySetInnerHTML={{ __html: post?.description }}
              className="intro-copy line-clamp-3 max-w-xl text-base leading-relaxed text-[#5b4a3d] sm:text-lg dark:text-stone-300">
              </p>
            </div>

            <div className="intro-actions flex flex-wrap items-center gap-4">
              <Link
                href='posts'
                className="inline-flex items-center justify-center rounded-2xl bg-[#E58E35] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_32px_rgba(229,142,53,0.24)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#d97a16]"
              >
                Explorar postagens
              </Link>
              <Link
                href={`/post/${post.id}`}
                className="inline-flex items-center justify-center rounded-2xl border border-[#E58E35]/20 bg-white/60 px-6 py-3 text-sm font-bold text-[#8E4F00] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/40 hover:bg-white dark:bg-stone-900/40 dark:text-amber-100"
              >
                Ver arquivo completo
              </Link>
            </div>

            <div className="intro-stats grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Leitura</p>
                <p className="mt-2 text-2xl font-black text-[#6f3c07] dark:text-white">3 min</p>
                <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">posts rápidos e diretos ao ponto</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Conteúdo</p>
                <p className="mt-2 text-2xl font-black text-[#6f3c07] dark:text-white">Histórias</p>
                <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">guia, cultura e cuidado em um só lugar</p>
              </div>
              {/* <div className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_36px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a56a22] dark:text-amber-300">Estilo</p>
                <p className="mt-2 text-2xl font-black text-[#6f3c07] dark:text-white">GSAP</p>
                <p className="mt-1 text-sm text-[#6d5b4d] dark:text-stone-400">animações suaves e com personalidade</p>
              </div> */}
            </div>
          </div>

          <div className="intro-visual relative mx-auto w-full max-w-[560px] lg:col-span-6 xl:col-span-5">
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full border border-[#E58E35]/20 bg-white/50 backdrop-blur dark:bg-stone-900/40" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/60 bg-white p-3 shadow-[0_24px_80px_rgba(119,74,21,0.16)] dark:border-stone-800/70 dark:bg-stone-900/70">
              <div className="absolute inset-x-6 top-6 h-28 rounded-full bg-gradient-to-r from-[#E58E35]/25 via-amber-200/20 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px]">
                <Image
                  src={post.postImageUrl || "/images/Happy-Corgi.webp"}
                  width={700}
                  height={760}
                  alt="foto de um corgi feliz"
                  className="h-[420px] w-full object-cover sm:h-[500px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="intro-visual-float absolute left-4 top-4 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-sm font-semibold text-[#6f3c07] shadow-lg backdrop-blur dark:border-stone-700/50 dark:bg-stone-950/75 dark:text-amber-100">
                  Novo destaque da semana
                </div>

                <div className="intro-visual-float absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-[1.4fr_0.9fr]">
                  <div className="rounded-3xl bg-stone-950/75 p-4 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                      Aula rápida
                    </p>
                    <p className="mt-2 text-lg font-black leading-tight">
                      História, saúde e curiosidades com uma leitura mais imersiva.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/85 p-4 text-[#6f3c07] backdrop-blur dark:bg-stone-950/75 dark:text-amber-100">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a56a22] dark:text-amber-300">
                      Temperamento
                    </p>
                    <p className="mt-2 text-3xl font-black">100%</p>
                    <p className="text-sm text-[#6d5b4d] dark:text-stone-300">fofo e convincente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )})}
    </section>
  );
}
