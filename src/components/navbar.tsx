"use client";

import Link from "next/link";
import {Github, Menu, Twitter, X} from "lucide-react";
import {ThemeToggle} from "@/components/theme-toggle";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, isMounted]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="border-muted relative z-50 border-b border-dashed px-4 py-4">
            <div className="container mx-auto flex max-w-3xl items-center justify-between">
                <div className="flex items-center space-x-1">
                    <div className="bg-destructive h-2.5 w-2.5 rounded-full opacity-70"></div>
                    <Link href="/" className="ml-2 font-mono text-lg tracking-tighter">
                        <span className="text-muted-foreground mr-1.5">~/</span>byte
                    </Link>
                </div>

                <div className="hidden items-center md:flex">
                    <nav className="mr-4 flex space-x-6">
                        <Link
                            href="/"
                            className="hover:text-primary flex items-center font-mono text-sm transition-colors"
                        >
                            <span className="text-muted-foreground mr-1">$</span>
                            <span>home</span>
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <ThemeToggle/>
                        <Link
                            href="https://github.com/bytewhat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors"
                            aria-label="Follow me on GitHub"
                        >
                            <Github size={16}/>
                        </Link>
                        <Link
                            href="https://x.com/bytewhat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-primary transition-colors"
                            aria-label="Follow me on X (Twitter)"
                        >
                            <Twitter size={16}/>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-3 md:hidden">
                    <ThemeToggle/>
                    <button onClick={toggleMenu} className="text-foreground p-1" aria-label="Toggle menu">
                        {isOpen ? <X size={20}/> : <Menu size={20}/>}
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    "bg-background/95 fixed inset-0 z-40 backdrop-blur-sm transition-transform duration-300 ease-in-out md:hidden",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex h-full flex-col items-center justify-center space-y-8 p-4">
                    <Link
                        href="/"
                        className="hover:text-primary flex items-center font-mono text-xl transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="text-muted-foreground mr-1">$</span>
                        <span>home</span>
                    </Link>
                    <Link
                        href="https://github.com/bytewhat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label="Follow me on GitHub"
                        onClick={() => setIsOpen(false)}
                    >
                        <Github size={20}/>
                    </Link>
                    <Link
                        href="https://x.com/bytewhat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label="Follow me on X (Twitter)"
                        onClick={() => setIsOpen(false)}
                    >
                        <Twitter size={20}/>
                    </Link>
                </div>
            </div>
        </header>
    );
}
