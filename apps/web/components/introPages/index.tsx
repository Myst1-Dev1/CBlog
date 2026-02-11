'use client';

import Image from "next/image";
import { useGSAPAnimate } from "../../hooks/useGSAPAnimate";
import { ANIM_CONFIG } from "../../utils/gsapConfig";
import gsap from "gsap";

interface IntroPagesProps {
    pageName: string
    title: string;
    description: string;
    btnText: string;
    categories: string;
    image: string;
    imagePosition: boolean;
}

export function IntroPages(
    { pageName, title, description, btnText, categories, image, imagePosition }
        : IntroPagesProps) {

    useGSAPAnimate(() => {
        gsap.fromTo(".intro-pages", {
            opacity: 0,
            y: 20,
            duration: ANIM_CONFIG.duration.medium,
            ease: ANIM_CONFIG.easing.base,
            delay: 0.2
        }, {
            opacity: 1,
            y: 0,
            duration: ANIM_CONFIG.duration.medium,
            ease: ANIM_CONFIG.easing.base,
            delay: 0.2
        });
    }, []);

    return (
        <>
            <div className="intro-pages grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
                {imagePosition === true &&
                    <div className="relative flex justify-center lg:justify-end">
                        {/* <div className="absolute -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-orange-100 rounded-full blur-3xl"></div> */}

                        <Image
                            src={image}
                            width={350}
                            height={350}
                            priority
                            className="object-cover max-w-md w-full m-auto"
                            alt="Corgi feliz"
                        />
                    </div>
                }

                <div className="max-w-xl col-span-2 m-auto">
                    <span className="inline-block mb-4 font-semibold text-sm lg:text-base bg-orange-500 text-white rounded-full px-4 py-1">
                        {pageName}
                    </span>

                    <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight">
                        {title} <br />
                        Ideal Para <span className="text-orange-500">Corgis</span>
                    </h1>

                    <p className="text-gray-500 mt-5 text-base lg:text-lg font-light">
                        {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-8">
                        <button className="flex-shrink-0 rounded-full cursor-pointer bg-orange-500 text-white px-6 py-3 font-semibold transition-all duration-500 hover:bg-orange-600 hover:scale-105">
                            {btnText}
                        </button>

                        <span className="text-sm text-gray-400">
                            {categories}
                        </span>
                    </div>
                </div>

                {imagePosition === false &&
                    <div className="relative flex justify-center lg:justify-start">
                        {/* <div className="absolute -z-10 w-72 h-72 lg:w-96 lg:h-96 bg-orange-100 rounded-full blur-3xl"></div> */}

                        <Image
                            src={image}
                            width={350}
                            height={350}
                            priority
                            className="object-cover"
                            alt="Corgi feliz"
                        />
                    </div>
                }

            </div>
        </>
    )
}