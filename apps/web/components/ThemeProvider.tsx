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

        root.classList.remove('light', 'dark');
        root.removeAttribute('data-theme');

        root.classList.add(theme);
        root.setAttribute('data-theme', theme);

    }, [theme, mounted]);

    return (
        <>
            {children}
        </>
    );
}
