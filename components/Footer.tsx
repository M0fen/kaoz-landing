export default function Footer() {
    return (
        <footer className="relative z-10 bg-transparent pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
                {/* Minimal Gold Divider */}
                <div className="h-px w-32 bg-gold/30"></div>

                {/* Copyright Text */}
                <p className="text-zinc-600 text-xs sm:text-sm font-mono text-center">
                    © {new Date().getFullYear()} K A O Z
                </p>
            </div>
        </footer>
    );
}
