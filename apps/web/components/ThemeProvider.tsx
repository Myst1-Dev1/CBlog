'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '../hooks/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Remove previous class/attribute
        root.classList.remove('light', 'dark');
        root.removeAttribute('data-theme');

        // Add new class and attribute
        root.classList.add(theme);
        root.setAttribute('data-theme', theme);

        // Force background color update if needed (e.g. if root bg isn't taking effect)
        // root.style.colorScheme = theme;

    }, [theme, mounted]);

    // Prevent hydration mismatch by rendering nothing until mounted (optional, depending on preference)
    // Or render children with default theme to avoid flash if possible, 
    // but here we just pass children and let the effect fix the theme.
    // To avoid FOUC (Flash of Unstyled Content) related to theme, a script in head is best,
    // but for this task we use the effect synchronizer.

    return (
        <>
            {children}
        </>
    );
}
