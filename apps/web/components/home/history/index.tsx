'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useTheme } from "../../../hooks/useTheme";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";
import { Corgi3D } from "./corgi3D";

const timeline = [
  {
    era: "Lendas das Fadas",
    icon: "✨",
    title: "O início místico",
    text: "Reza a lenda que os Corgis eram montarias das fadas guerreiras de Gales. As marcas no dorso seriam rastros de selas encantadas.",
  },
  {
    era: "Viajantes Medievais",
    icon: "🧭",
    title: "Chegada a Gales",
    text: "Os tecelões flamengos trouxeram os primeiros exemplares em 1107. Desde então, viraram parceiros de trabalho e símbolo de utilidade inteligente.",
  },
  {
    era: "Favoritos da Realeza",
    icon: "🏅",
    title: "Status de ícone",
    text: "A rainha Elizabeth II elevou a raça ao imaginário popular, transformando o Corgi em referência cultural de afeto, presença e tradição.",
  },
];

export function History() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      gsap.from(".history-kicker", {
        opacity: 0,
        y: 18,
        duration: ANIM_CONFIG.duration.medium,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".history-figure", {
        opacity: 0,
        x: -40,
        duration: ANIM_CONFIG.duration.slow,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.from(".history-item", {
        opacity: 0,
        y: 28,
        duration: ANIM_CONFIG.duration.medium,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 64%",
        },
      });

      gsap.to(".history-glow", {
        y: -18,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [], sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-20 transition-colors duration-300 ${
        isDark
          ? "bg-[linear-gradient(180deg,_rgba(18,14,11,0.96),_rgba(11,9,8,1))]"
          : "bg-[linear-gradient(180deg,_#fff7ed,_#fffaf3)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="history-glow absolute left-8 top-10 h-44 w-44 rounded-full bg-[#E58E35]/10 blur-3xl" />
        <div className="history-glow absolute right-0 top-1/2 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <span className="history-kicker inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:bg-stone-900/70 dark:text-amber-200">
            História em camadas
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#7a4308] sm:text-4xl lg:text-5xl dark:text-amber-100">
            A origem do Corgi com uma leitura mais cinematográfica
          </h2>
          <p className={`text-base leading-relaxed ${isDark ? "text-stone-400" : "text-[#5d4b3d]"}`}>
            Uma linha do tempo mais expressiva, um modelo 3D em destaque e um ritmo visual que guia o olhar do mito à realeza.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="history-figure lg:col-span-5">
            <div className={`relative overflow-hidden rounded-[36px] border p-4 shadow-[0_24px_80px_rgba(119,74,21,0.12)] ${
              isDark
                ? "border-stone-800/70 bg-stone-950/60"
                : "border-white/70 bg-white/85 backdrop-blur"
            }`}>
              <div className="absolute inset-x-6 top-6 h-28 rounded-full bg-gradient-to-r from-[#E58E35]/20 via-amber-200/20 to-transparent blur-2xl" />
              {isDark && (
                <div className="absolute -right-6 top-10 h-28 w-28 rounded-full bg-amber-500/10 blur-3xl" />
              )}
              <div className="relative flex min-h-[460px] items-center justify-center">
                <Corgi3D />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative ml-2 flex flex-col gap-5 border-l border-dashed border-[#E58E35]/25 pl-6 dark:border-stone-800">
              {timeline.map((item) => (
                <article
                  key={item.era}
                  className="history-item group relative rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_12px_34px_rgba(119,74,21,0.08)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 dark:border-stone-800/70 dark:bg-stone-900/65"
                >
                  <div className={`absolute -left-[38px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-black ${
                    isDark
                      ? "border-amber-400 bg-stone-950 text-amber-300"
                      : "border-[#E58E35] bg-white text-[#8E4F00]"
                  }`} />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a56a22] dark:text-amber-300">
                          {item.era}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#6f3c07] dark:text-white">{item.title}</h3>
                      <p className={`max-w-2xl text-sm leading-relaxed ${isDark ? "text-stone-400" : "text-stone-600"}`}>
                        {item.text}
                      </p>
                    </div>
                    <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8E4F00] dark:text-amber-200">
                      capítulo
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
