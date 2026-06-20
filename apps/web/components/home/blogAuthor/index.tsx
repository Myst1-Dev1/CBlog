'use client';

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";

const principles = [
  "Conteúdo feito com curiosidade, não só com volume.",
  "Uma estética quente, editorial e fácil de explorar.",
  "Animar com intenção: movimento só quando ajuda a narrativa.",
];

export function BlogAuthor() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      gsap.from(".author-portrait", {
        opacity: 0,
        x: -36,
        duration: ANIM_CONFIG.duration.slow,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".author-copy > *", {
        opacity: 0,
        y: 18,
        duration: ANIM_CONFIG.duration.medium,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.to(".author-pulse", {
        scale: 1.08,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [], sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-20 transition-colors duration-300 bg-[linear-gradient(180deg,_rgba(23,16,12,0.96),_rgba(11,9,8,1))]
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="author-pulse absolute left-8 top-16 h-40 w-40 rounded-full bg-[#E58E35]/10 blur-3xl" />
        <div className="author-pulse absolute right-0 top-1/2 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className={`grid items-center gap-10 overflow-hidden rounded-[36px] border p-6 md:p-10 lg:grid-cols-12 border-stone-800/70 bg-stone-950/60 backdrop-blur
        }`}>
          <div className="author-portrait lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] bg-stone-800/50
            }`} />
              <div className="relative aspect-square overflow-hidden rounded-[32px] border border-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.08)] dark:border-stone-800/70">
                <Image
                  fill
                  src="/images/john-author.webp"
                  alt="John, criador do CorgiCloud"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-4 py-3 text-sm font-bold text-[#6f3c07] shadow-lg backdrop-blur dark:bg-stone-950/80 dark:text-amber-100">
                  Rosto por trás do blog
                </div>

                <div className="absolute bottom-4 right-4 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8E4F00] backdrop-blur dark:bg-stone-950/80 dark:text-amber-200">
                  Approved
                </div>
              </div>
            </div>
          </div>

          <div className="author-copy lg:col-span-7 space-y-6">
            <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] dark:text-amber-200">
              O coração por trás das patinhas
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl font-black tracking-tight text-[#7a4308] sm:text-4xl lg:text-5xl dark:text-amber-100">
                Conheça John, o humano por trás do CorgiBlog
              </h2>
              <p className={`text-base leading-relaxed text-stone-400`}>
                John é mais que um entusiasta. Ele organizou o CorgiCloud como um espaço para compartilhar história, cuidado e cultura com um tom caloroso e fácil de navegar.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {principles.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/60 bg-white/80 p-4 text-sm leading-relaxed shadow-[0_10px_28px_rgba(119,74,21,0.06)] dark:border-stone-800/70 dark:bg-stone-900/65 dark:text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/60 pt-5 dark:border-stone-800/70">
              <div className="group">
                <h3 className="text-lg font-black text-[#6f3c07] dark:text-white">John Doe</h3>
                <div className="mt-1 h-0.5 w-24 origin-left bg-[#E58E35] transition-transform duration-300 group-hover:scale-x-110" />
              </div>
              <span className="rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8E4F00] dark:text-amber-200">
                Curadoria afetiva
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
