import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ANIM_CONFIG = {
  duration: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    extraSlow: 1.2,
  },
  easing: {
    base: "power2.out",
    smooth: "power3.inOut",
    bounce: "elastic.out(1, 0.5)",
    soft: "expo.out",
  },
};

export const gsapFadeIn = (
  target: gsap.TweenTarget, 
  vars?: gsap.TweenVars
) => {
  return gsap.from(target, {
    opacity: 0,
    y: 20,
    duration: ANIM_CONFIG.duration.medium,
    ease: ANIM_CONFIG.easing.base,
    ...vars,
  });
};

export const gsapStagger = (
  target: gsap.TweenTarget,
  stagger = 0.1,
  vars?: gsap.TweenVars
) => {
  return gsap.from(target, {
    opacity: 0,
    y: 30,
    duration: ANIM_CONFIG.duration.medium,
    ease: ANIM_CONFIG.easing.base,
    stagger,
    ...vars,
  });
};
