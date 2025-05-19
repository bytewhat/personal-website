export function Footer() {
    return (
        <footer
            className="text-muted-foreground border-muted border-t border-dashed pt-6 pb-6 text-center font-mono text-xs md:pt-8">
            <p>© {new Date().getFullYear()} byte.bz</p>
        </footer>
    );
}
