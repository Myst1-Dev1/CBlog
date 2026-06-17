"use client";

import { useThemeStore } from "../../hooks/useThemeStore";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    console.log(theme)

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'} cursor-pointer transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none`}
            title="Alternar tema"
        >
            {theme === "light" ? (
                <FaMoon className="text-white" />
            ) : (
                <FaSun className="text-black" />
            )}
        </button>
    );
}
