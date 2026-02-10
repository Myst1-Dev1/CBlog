"use client";

import { useThemeStore } from "../../hooks/useThemeStore";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            title="Alternar tema"
        >
            {theme === "light" ? (
                <FaMoon className="text-white text-lg" />
            ) : (
                <FaSun className="text-white text-lg" />
            )}
        </button>
    );
}
