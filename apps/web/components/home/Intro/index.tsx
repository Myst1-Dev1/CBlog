'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { useUserStore } from "../../../hooks/user/useUserStore";
import { useGSAPAnimate } from "../../../hooks/useGSAPAnimate";
import gsap from "gsap";
import { ANIM_CONFIG } from "../../../utils/gsapConfig";

export function Intro() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { post } = usePostStore();
  const { users } = useUserStore();

  const authorIds = new Set(post?.map(p => p.authorId));
  const postsData = post?.slice(0, 3) || [];
  const slidesCount = postsData.length;

  const authors = users?.filter(user =>
    authorIds.has(user.id)
  );

  // Animação de entrada do conteúdo do slide ativo
  useGSAPAnimate(() => {
    const activeSlide = document.querySelector('.swiper-slide-active .intro-content');
    if (activeSlide) {
      gsap.fromTo(activeSlide.querySelectorAll('.animate-item'),
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: ANIM_CONFIG.duration.medium,
          stagger: 0.15,
          ease: ANIM_CONFIG.easing.base,
          clearProps: "all"
        }
      );
    }
  }, [activeIndex, slidesCount]);

  return (
    <section className="relative overflow-hidden">
      <Swiper
        slidesPerView={1}
        speed={800}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {postsData.map(data => {
          const author = authors?.find(
            (author) => author.id === data.authorId
          );
          return (
            <SwiperSlide key={data.id}>
              <div className="flex items-end justify-center relative w-full min-h-dvh lg:min-h-screen"
                style={{
                  backgroundImage: `url(${data.postImageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 to-transparent" />

                <div className="container flex items-end justify-end min-h-screen py-12 z-20">
                  <div className="intro-content text-white flex justify-between flex-wrap gap-7 lg:gap-0 items-center w-full">
                    <div className="max-w-md w-full flex flex-col gap-4">
                      <span className="animate-item w-fit px-2 py-1 bg-orange-400 rounded-full font-medium shadow-lg">
                        {data.category}
                      </span>

                      <h2 className="animate-item font-bold text-3xl lg:text-4xl leading-tight">
                        {data.title}
                      </h2>

                      <div
                        className="animate-item line-clamp-2 text-sm lg:text-base font-light opacity-90"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />

                      <Link
                        href={`/post/${data.id}`}
                        className="animate-item grid place-items-center w-fit h-12 rounded-full px-8 bg-white text-black font-bold transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95 shadow-lg"
                      >
                        Ver Mais
                      </Link>
                    </div>

                    <div className="flex flex-col gap-3 animate-item">
                      <div className="flex items-center gap-5">
                        <Image
                          src={author?.avatarUrl || "/images/user.jpg"}
                          width={200}
                          height={200}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                          alt="foto do usuário"
                        />
                        <h3 className="font-semibold text-lg">{author?.username}</h3>
                      </div>

                      <span className="text-sm font-light opacity-80">
                        24 de Janeiro de 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <div className="absolute bottom-5 left-4 lg:left-10 z-30 flex items-center gap-3">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <span
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`
              w-3 h-3 rounded-full cursor-pointer transition-all duration-300
              ${activeIndex === index
                ? 'bg-orange-500 w-8'
                : 'bg-white/50 hover:bg-white'}
            `}
          />
        ))}
      </div>
    </section>
  );
}
