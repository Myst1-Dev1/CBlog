'use server';

import { PostIntro } from '../../../components/post'
import { Comments } from '../../../components/post/Comments';
import { fetchPostById } from '../../../hooks/fetchPostById';
import { getComments } from '../../../hooks/getComments';

export default async function Post({ params }: any) {
    const { id } = await params;

    const data = await fetchPostById(Number(id));
    const comments = await getComments(Number(id));

    return (
        <main className="relative overflow-hidden bg-[linear-gradient(180deg,_var(--background),_rgba(255,247,237,0.95))] dark:bg-[linear-gradient(180deg,_var(--background),_rgba(10,8,7,0.98))]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.1),_transparent_60%)]" />
            <div className="pointer-events-none absolute right-[-8%] top-[540px] h-[340px] w-[340px] rounded-full bg-amber-300/10 blur-3xl" />

            <PostIntro title={data?.title} category={data?.category} postImageUrl={data?.postImageUrl} />

            <article className="relative px-4 pb-12 pt-8 md:pb-16 md:pt-10">
                <div className="container mx-auto grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                    <div className="overflow-hidden rounded-[34px] border border-white/70 bg-[var(--card-bg)] shadow-[0_24px_80px_rgba(119,74,21,0.08)] dark:border-stone-800/70 dark:bg-stone-950/70">
                        <div className="border-b border-white/70 px-6 py-5 dark:border-stone-800/70 md:px-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                    Artigo principal
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] dark:text-stone-500">
                                    Leitura imersiva
                                </span>
                            </div>
                        </div>

                        <div
                            className="article-body px-6 py-7 text-[var(--foreground)] md:px-8 md:py-10 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:tracking-tight [&_h1]:text-[#7a4308] dark:[&_h1]:text-amber-100 [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[#7a4308] dark:[&_h2]:text-amber-100 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#8E4F00] dark:[&_h3]:text-amber-200 [&_p]:mb-5 [&_p]:text-base [&_p]:leading-8 [&_p]:text-[var(--text-muted)] dark:[&_p]:text-stone-300 [&_a]:font-semibold [&_a]:text-[#E58E35] [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-[#c96e0f] [&_img]:my-8 [&_img]:w-full [&_img]:rounded-[28px] [&_img]:shadow-lg [&_ul]:mb-6 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ol]:mb-6 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#E58E35] [&_blockquote]:bg-[#E58E35]/5 [&_blockquote]:p-5 [&_blockquote]:italic [&_blockquote]:text-[#5d4b3d] dark:[&_blockquote]:bg-amber-400/10 dark:[&_blockquote]:text-stone-300"
                            dangerouslySetInnerHTML={{ __html: data?.description }}
                        />
                    </div>

                    <aside className="space-y-5 lg:sticky lg:top-24">
                        <div className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_16px_42px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                            <span className="inline-flex w-fit rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
                                Guia rápido
                            </span>
                            <h2 className="mt-4 text-2xl font-black tracking-tight text-[#7a4308] dark:text-amber-100">
                                Um post com ritmo de revista
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-400">
                                O layout da leitura foi pensado para dar mais respiro, foco no conteúdo e uma sensação mais premium ao artigo.
                            </p>
                        </div>

                        <div className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_16px_42px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a56a22] dark:text-amber-300">
                                Categoria
                            </p>
                            <p className="mt-3 text-2xl font-black text-[#6f3c07] dark:text-white">
                                {data?.category}
                            </p>
                            <div className="mt-5 h-px w-full bg-gradient-to-r from-[#E58E35]/40 to-transparent" />
                            <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)] dark:text-stone-400">
                                Inspire-se, leia com calma e explore a conversa abaixo para seguir navegando pelo universo do site.
                            </p>
                        </div>

                        {/* <div className="rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,_rgba(229,142,53,0.12),_rgba(255,255,255,0.72))] p-6 shadow-[0_16px_42px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-[linear-gradient(180deg,_rgba(229,142,53,0.1),_rgba(17,13,11,0.86))]">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a56a22] dark:text-amber-300">
                                Destaque visual
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-[#5d4b3d] dark:text-stone-300">
                                A capa, o artigo e os comentários agora conversam com a mesma identidade quente, limpa e editorial.
                            </p>
                        </div> */}
                    </aside>
                </div>

                <div className="container mx-auto mt-10 lg:mt-14">
                    <Comments data={data} comments={comments} />
                </div>
            </article>
        </main>
    )
}

