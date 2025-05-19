"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import React from "react";

type ThemeProviderProps = {
    children: React.ReactNode;
    attribute?: "class" | "data-theme" | "data-mode";
    defaultTheme?: string;
    enableSystem?: boolean;
    storageKey?: string;
    disableTransitionOnChange?: boolean;
};

export function ThemeProvider({
                                  children,
                                  attribute = "class",
                                  defaultTheme = "system",
                                  enableSystem = true,
                                  storageKey = "theme",
                                  disableTransitionOnChange,
                                  ...props
                              }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
            storageKey={storageKey}
            disableTransitionOnChange={disableTransitionOnChange}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}
