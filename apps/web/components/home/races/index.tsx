'use client';

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";

interface RaceData {
  id: string;
  name: string;
  tagline: string;
  image: string;
  hp: number;
  type: string;
  description: string;
  stats: { label: string; value: string }[];
}

const racesData: RaceData[] = [
  {
    id: "pembroke",
    name: "Pembroke Welsh",
    tagline: "O favorito da realeza e cheio de energia",
    image: "/images/pembroke-welsh.webp",
    hp: 100,
    type: "Herding Group 🐾",
    description:
      "Reconhecido historicamente por sua marcante falta de cauda e orelhas pontudas e expressivas. É uma bateria de energia infinita, leal e muito apegada à família.",
    stats: [
      { label: "Energia", value: "90%" },
      { label: "Inteligência", value: "95%" },
      { label: "Dispersão", value: "80%" },
    ],
  },
  {
    id: "cardigan",
    name: "Cardigan Welsh",
    tagline: "O clássico corgi de cauda longa e porte robusto",
    image: "/images/cardigan-welsh.webp",
    hp: 110,
    type: "Herding Group 🛡️",
    description:
      'Conhecido como o "Corgi com cauda". É uma linhagem antiga, robusta, equilibrada e com uma presença silenciosa de guardião.',
    stats: [
      { label: "Energia", value: "75%" },
      { label: "Inteligência", value: "92%" },
      { label: "Robustez", value: "90%" },
    ],
  },
];

export function Races() {
  const [activeTab, setActiveTab] = useState("pembroke");
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const currentRace = useMemo(
    () => racesData.find((race) => race.id === activeTab) || racesData[0],
    [activeTab]
  );

  useGSAPAnimate(() => {
    const ctx = gsap.context(() => {
      gsap.from(".races-kicker", {
        opacity: 0,
        y: 18,
        duration: ANIM_CONFIG.duration.medium,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      gsap.from(".races-tabs > *", {
        opacity: 0,
        y: 14,
        duration: ANIM_CONFIG.duration.medium,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
        },
      });

      gsap.from(".races-panel", {
        opacity: 0,
        y: 34,
        duration: ANIM_CONFIG.duration.slow,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.to(".races-orb", {
        y: -16,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab], sectionRef);

  useGSAPAnimate(() => {
    if (!panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".race-dynamic",
        { opacity: 0, y: 22, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: ANIM_CONFIG.duration.medium, ease: "power3.out" }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [activeTab], panelRef);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-4 py-20 transition-colors duration-300 bg-[linear-gradient(180deg,_rgba(12,10,9,1),_rgba(24,17,13,0.96))]
      }`}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="races-orb absolute left-[-40px] top-10 h-56 w-56 rounded-full bg-[#E58E35]/10 blur-3xl" />
        <div className="races-orb absolute right-0 top-1/3 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <span className="races-kicker inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:bg-stone-900/70 dark:text-amber-200">
            Raças em foco
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#7a4308] sm:text-4xl lg:text-5xl dark:text-amber-100">
            Duas personalidades, um mesmo charme
          </h2>
          <p className={`text-base leading-relaxed text-stone-400`}>
            O painel agora funciona como uma vitrine editorial. A troca de raça anima o conteúdo para dar sensação de catálogo vivo, não de formulário estático.
          </p>
        </div>

        <div className="races-tabs mb-8 flex flex-wrap justify-center gap-3">
          {racesData.map((race) => (
            <button
              key={race.id}
              onClick={() => setActiveTab(race.id)}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
                activeTab === race.id
                  ? "bg-[#E58E35] text-white shadow-[0_14px_30px_rgba(229,142,53,0.22)]"
                  : 
                  "bg-stone-900/70 text-stone-300 hover:text-white"
              }`}
            >
              {race.name}
            </button>
          ))}
        </div>

        <div
          ref={panelRef}
          className={`races-panel overflow-hidden rounded-[36px] border p-6 md:p-10 border-stone-800/70 bg-stone-950/60 backdrop-blur}`}
        >
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="race-dynamic lg:col-span-5">
              <div className="relative overflow-hidden rounded-[30px]">
                <Image
                  src={currentRace?.image || '/images/corgi.webp'}
                  alt={currentRace?.name || 'corgi'}
                  width={800}
                  height={800}
                  className="h-[420px] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8E4F00] backdrop-blur dark:bg-stone-950/75 dark:text-amber-200">
                  HP {currentRace?.hp}
                </div>
              </div>
            </div>

            <div className="race-dynamic lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8E4F00] dark:text-amber-200">
                  {currentRace?.type}
                </span>
                <span className={`text-xs font-semibold uppercase tracking-[0.25em] text-stone-500`}>
                  perfil ativo
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#6f3c07] dark:text-white">{currentRace?.name}</h3>
                <p className="text-lg font-semibold text-[#E58E35]">{currentRace?.tagline}</p>
                <p className={`max-w-2xl text-sm leading-relaxed text-stone-400`}>
                  {currentRace?.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {currentRace?.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`rounded-[24px] border p-4 text-center border-stone-800 bg-stone-900/80
                    }`}
                  >
                    <span className={`block text-xs font-medium uppercase tracking-[0.25em] text-stone-500`}>
                      {stat.label}
                    </span>
                    <span className="mt-2 block text-2xl font-black text-[#E58E35]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
