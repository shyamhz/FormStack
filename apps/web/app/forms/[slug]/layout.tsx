export default function PublicFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-bg dot-grid flex flex-col">
            {/* Minimal floating header */}
            <header className="h-12 flex items-center justify-between px-6 shrink-0">
                <span className="text-[12.5px] text-muted">
                    Form by <span className="text-ink-2 font-medium">Studio North</span>
                </span>

                <span className="font-display italic text-[12px] text-muted-2">
                    Powered by Formstack
                </span>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col">
                <div className="w-full max-w-[680px] mx-auto px-6 py-12 flex-1 flex flex-col">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="shrink-0 py-5 px-6">
                <div className="max-w-[680px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11.5px] text-muted-2">
                        <button className="hover:text-muted transition-colors">Report</button>

                        <span className="text-line-strong">·</span>

                        <button className="hover:text-muted transition-colors">Terms</button>

                        <span className="text-line-strong">·</span>

                        <button className="hover:text-muted transition-colors">Privacy</button>
                    </div>

                    <span className="text-[11px] text-muted-2 nums">
                        {new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </footer>
        </div>
    );
}

