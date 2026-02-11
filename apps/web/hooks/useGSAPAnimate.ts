import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Wrapper simples sobre o useGSAP para garantir tipagem e padrões
 */
export const useGSAPAnimate = (
    callback: () => void,
    dependencies: any[] = [],
    scope?: React.RefObject<any>
) => {
    return useGSAP(callback, { dependencies, scope, revertOnUpdate: true });
};
