import type {Metadata, Viewport} from "next";
import {JetBrains_Mono} from "next/font/google";
import "./globals.css";
import {NavBar} from "@/components/navbar";
import {ThemeProvider} from "@/components/theme-provider";
import {Footer} from "@/components/footer";
import {Analytics} from "@vercel/analytics/next"

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "byte | software developer",
    metadataBase: new URL("https://byte.bz"),
    description:
        "A full-stack developer passionate about React Native and Solana. This blog features insights, tutorials, and project showcases covering mobile development, blockchain, and more.",
    openGraph: {
        title: "byte | software developer",
        description:
            "A full-stack developer passionate about React Native and Solana. This blog features insights, tutorials, and project showcases covering mobile development, blockchain, and more.",
        url: "https://byte.bz",
        siteName: "byte",
        images: [
            {
                url: "/bg.png",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "byte | software developer",
        description:
            "A full-stack developer passionate about React Native and Solana. This blog features insights, tutorials, and project showcases covering mobile development, blockchain, and more.",
        creator: "@bytewhat",
        images: ["/bg.png"],
    },
    icons: {
        icon: [
            {url: "/favicon.ico", sizes: "any", type: "image/x-icon"},
            {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
            {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
            {url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
            {url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
        ],
        apple: [{url: "/apple-touch-icon.png", type: "image/png"}],
    },
    manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${jetbrainsMono.className} flex min-h-screen flex-col`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <header
                className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
                <NavBar/>
            </header>
            <main className="flex-grow pt-16 pb-16">{children}</main>
            <footer
                className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-50 w-full border-t backdrop-blur">
                <Footer/>
            </footer>
        </ThemeProvider>
        <Analytics/>
        </body>
        </html>
    );
}
