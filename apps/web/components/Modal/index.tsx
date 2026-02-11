import React from "react";
import { FaTimes } from "react-icons/fa";
import { ANIM_CONFIG } from "../../utils/gsapConfig";
import { useGSAPAnimate } from "../../hooks/useGSAPAnimate";
import gsap from "gsap";

interface ModalProps {
    maxWidth: string;
    children: React.ReactNode;
    isOpen: boolean;
    setisOpen: any;
}

export function Modal({ maxWidth, children, isOpen, setisOpen }: ModalProps) {

    useGSAPAnimate(() => {
        gsap.fromTo(".modal", {
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
    }, [isOpen]);

    return (
        <>
            {isOpen &&
                <div onClick={() => setisOpen(false)} className="modal bg-black/50 inset-0 z-50 fixed top-0 left-0 right-0 min-h-screen w-full">
                    <div onClick={(e) => e.stopPropagation()} className={`${maxWidth} rounded-md w-full absolute bg-white text-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}>
                        <div className='absolute top-2 right-2 z-50 w-8 h-8 rounded-full cursor-pointer transition-all duration-500 hover:bg-orange-400 bg-gray-800 text-white grid place-items-center' onClick={() => setisOpen(false)}>
                            <FaTimes />
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}