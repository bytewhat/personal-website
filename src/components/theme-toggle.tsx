"use client";

import * as React from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-muted/50 flex items-center justify-center rounded-md p-2 transition-colors"
            aria-label="Toggle theme"
        >
            <Sun size={16} className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
            <Moon
                size={16}
                className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
