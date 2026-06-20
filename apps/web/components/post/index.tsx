interface PostIntroProps {
    title: string;
    category: string;
    postImageUrl: string;
}

export function PostIntro({ title, category, postImageUrl }: PostIntroProps) {
    return (
        <section className="relative overflow-hidden px-4 py-6 md:py-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-[#E58E35]/15 blur-3xl" />
                <div className="absolute right-0 top-24 h-52 w-52 rounded-full bg-amber-300/10 blur-3xl" />
            </div>

            <div className="relative min-h-[56vh] overflow-hidden rounded-[36px] border border-white/70 bg-[var(--card-bg)] shadow-[0_24px_80px_rgba(119,74,21,0.12)] dark:border-stone-800/70 dark:bg-stone-950/70">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${postImageUrl})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.78))] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.28),rgba(7,6,5,0.92))]" />

                <div className="relative z-10 flex min-h-[56vh] items-end">
                    <div className="container w-full py-8 md:py-10">
                        <div className="max-w-3xl space-y-5 text-white">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-amber-100 backdrop-blur">
                                    {category}
                                </span>
                                <span className="inline-flex rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
                                    Leitura editorial
                                </span>
                            </div>

                            <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
                                {title}
                            </h1>

                            <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                                Um mergulho mais imersivo no universo do Corgi, com visual cinematográfico e leitura confortável.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
