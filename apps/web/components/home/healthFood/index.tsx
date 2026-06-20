'use client';

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";

const tips = [
  {
    title: "Dieta equilibrada",
    text: "Proteínas de alta qualidade e fibras controladas ajudam a manter saciedade sem sobrecarga.",
    icon: "🥗",
  },
  {
    title: "Petiscos permitidos",
    text: "Cenouras e maçã em pequenas porções funcionam como recompensas leves e seguras.",
    icon: "🍎",
  },
  {
    title: "Prevenção de obesidade",
    text: "A manutenção do peso ideal protege a coluna e melhora energia, mobilidade e humor.",
    icon: "⚖️",
  },
];

export function HealthFood() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      gsap.from(".food-kicker", {
        opacity: 0,
        y: 18,
        duration: ANIM_CONFIG.duration.medium,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".food-tip", {
        opacity: 0,
        x: -24,
        duration: ANIM_CONFIG.duration.medium,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(".food-visual", {
        opacity: 0,
        x: 36,
        duration: ANIM_CONFIG.duration.slow,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.to(".food-bubble", {
        y: -14,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [], sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-20 transition-colors duration-300 bg-[linear-gradient(180deg,_rgba(11,9,8,1),_rgba(23,16,12,0.96))]
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="food-bubble absolute left-0 top-16 h-44 w-44 rounded-full bg-[#E58E35]/10 blur-3xl" />
        <div className="food-bubble absolute right-8 top-1/2 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl space-y-4">
          <span className="food-kicker inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:bg-stone-900/70 dark:text-amber-200">
            Cuidado vital
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#7a4308] sm:text-4xl lg:text-5xl dark:text-amber-100">
            Alimentação saudável com foco em bem-estar real
          </h2>
          <p className={`text-base leading-relaxed text-stone-400`}>
            Uma seção mais editorial para lembrar que saúde começa na rotina. Visual limpo, dicas objetivas e um destaque visual para fixar a mensagem.
          </p>
        </div>

        <div className={`grid items-center gap-8 overflow-hidden rounded-[36px] border p-6 md:p-10 lg:grid-cols-12 border-stone-800/70 bg-stone-950/60 backdrop-blur
        }`}>
          <div className="lg:col-span-7 space-y-4">
            {tips.map((tip, index) => (
              <article
                key={tip.title}
                className="food-tip flex items-start gap-4 rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-[0_12px_28px_rgba(119,74,21,0.06)] dark:border-stone-800/70 dark:bg-stone-900/65"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-xl bg-stone-950 text-amber-300
                }`}>
                  {tip.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a56a22] dark:text-amber-300">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg font-black text-[#6f3c07] dark:text-white">{tip.title}</h3>
                  </div>
                  <p className={`text-sm leading-relaxed text-stone-400`}>
                    {tip.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="food-visual lg:col-span-5">
            <div className="relative overflow-hidden rounded-[32px]">
              <Image
                src="/images/corgi-puppy.webp"
                width={800}
                height={800}
                alt="Filhote de Corgi saudável se alimentando"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 rounded-2xl border border-white/50 bg-white/85 px-4 py-3 text-sm font-bold text-[#6f3c07] shadow-lg backdrop-blur dark:border-stone-700/50 dark:bg-stone-950/70 dark:text-amber-100">
                Peso ideal protege a coluna
              </div>

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/90 p-3 text-center text-[#6f3c07] backdrop-blur dark:bg-stone-950/75 dark:text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a56a22] dark:text-amber-300">Foco</p>
                  <p className="mt-1 text-lg font-black">Nutrição</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-3 text-center text-[#6f3c07] backdrop-blur dark:bg-stone-950/75 dark:text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a56a22] dark:text-amber-300">Meta</p>
                  <p className="mt-1 text-lg font-black">Peso ideal</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-3 text-center text-[#6f3c07] backdrop-blur dark:bg-stone-950/75 dark:text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a56a22] dark:text-amber-300">Resultado</p>
                  <p className="mt-1 text-lg font-black">Mais energia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
