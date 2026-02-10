'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import { usePostStore } from "../../../hooks/posts/usePostStore";
import { useUserStore } from "../../../hooks/user/useUserStore";

export function Intro() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  const { post } = usePostStore();
  const { users } = useUserStore();

  const authorIds = new Set(post?.map(p => p.authorId));

  const postsData = post?.slice(0, 3);

  const authors = users?.filter(user =>
    authorIds.has(user.id)
  );

  return (
    <section className="relative">
      <Swiper
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSlidesCount(swiper.slides.length);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {postsData?.map(data => {
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
                  <div className="text-white flex justify-between flex-wrap gap-7 lg:gap-0 items-center w-full">
                    <div className="max-w-md w-full flex flex-col gap-4">
                      <span className="w-fit px-2 py-1 bg-orange-400 rounded-full font-medium">
                        {data.category}
                      </span>

                      <h2 className="font-semibold text-2xl">
                        {data.title}
                      </h2>

                      <div
                        className="line-clamp-2 text-sm font-thin"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />

                      <Link
                        href={`/post/${data.id}`}
                        className="grid place-items-center w-fit h-10 rounded-full px-4 bg-white text-black font-semibold transition-all duration-500 hover:bg-orange-500 hover:text-white"
                      >
                        Ver Mais
                      </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-5">
                        <Image
                          src={author?.avatarUrl || "/images/user.jpg"}
                          width={200}
                          height={200}
                          className="w-14 h-14 rounded-full object-cover"
                          alt="foto do usuário"
                        />
                        <h3 className="font-semibold">{author?.username}</h3>
                      </div>

                      <span className="text-sm font-thin">
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

      <div className="absolute bottom-4 left-4 lg:left-10 z-30 flex items-center gap-2">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <span
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`
              w-4 h-4 rounded-full cursor-pointer transition-all
              ${activeIndex === index
                ? 'bg-white scale-110'
                : 'border border-white'}
            `}
          />
        ))}
      </div>
    </section>
  );
}