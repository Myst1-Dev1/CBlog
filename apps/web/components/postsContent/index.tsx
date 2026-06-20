'use client';

import { useMemo, useState } from 'react';

import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { Post } from "../../@types/Post";
import { useUserStore } from "../../hooks/user/useUserStore";
import { PostCard } from "../postCard";
import { usePagination } from "../../hooks/usePagination";

interface PostsContentProps {
  data: Post[];
}

export function PostsContent({ data }: PostsContentProps) {
  const { users } = useUserStore();
  
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return data.filter((post) => {
      const normalizedSearch = search.toLowerCase();

      return (
        post.title?.toLowerCase().includes(normalizedSearch) ||
        post.description?.toLowerCase().includes(normalizedSearch) ||
        post.category?.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [data, search]);
  
  const {
    prevPage,
    nextPage,
    totalPages,
    paginatedItems,
    paginationRange,
    currentPage,
    goToPage,
  } = usePagination({
    items: filteredPosts,
    itemsPerPage: 6,
  });

  const authorIds = new Set(data?.map((post: any) => post.authorId));
  const authors = users?.filter((user) => authorIds.has(user.id));

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_var(--background),_rgba(255,247,237,0.95))] px-4 py-10 md:py-14 dark:bg-[linear-gradient(180deg,_var(--background),_rgba(15,11,9,0.98))]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.12),_transparent_60%)]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/2 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl dark:bg-amber-300/5" />

      <div className="container relative z-10 mx-auto space-y-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-7">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E58E35]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#8E4F00] shadow-sm backdrop-blur dark:border-amber-400/20 dark:bg-stone-900/70 dark:text-amber-200">
              Caderno de Patas
            </span>
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-[#7a4308] sm:text-5xl lg:text-6xl dark:text-amber-100">
                Blog
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg dark:text-stone-400">
                Bem-vindos ao nosso cantinho aconchegante na internet. Aqui compartilhamos histórias, dicas de cuidados e aventuras do dia a dia com nossos companheiros favoritos.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_50px_rgba(119,74,21,0.08)] backdrop-blur dark:border-stone-800/70 dark:bg-stone-900/70">
              <div className="flex items-center gap-3 rounded-2xl border border-[#E58E35]/15 bg-[var(--background)] px-4 py-3 dark:border-amber-400/20 dark:bg-stone-950/80">
                <FaSearch className="shrink-0 text-[#a56a22] dark:text-amber-300" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--text-muted)] dark:placeholder:text-stone-500"
                  placeholder="Pesquise aqui..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[30px] border border-white/70 bg-white/75 p-4 shadow-[0_18px_50px_rgba(119,74,21,0.06)] backdrop-blur lg:flex-row lg:items-center lg:justify-between dark:border-stone-800/70 dark:bg-stone-900/65">
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            <span className="shrink-0 cursor-pointer rounded-full bg-[#8E4F00] px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#733f00] dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400">
              Todos
            </span>
            <span className="shrink-0 cursor-pointer rounded-full border border-[#E58E35]/15 bg-white px-5 py-2 text-sm font-semibold text-[#5d4b3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] dark:border-stone-800 dark:bg-stone-950/70 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200">
              Alimentação
            </span>
            <span className="shrink-0 cursor-pointer rounded-full border border-[#E58E35]/15 bg-white px-5 py-2 text-sm font-semibold text-[#5d4b3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] dark:border-stone-800 dark:bg-stone-950/70 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200">
              Treinamento
            </span>
            <span className="shrink-0 cursor-pointer rounded-full border border-[#E58E35]/15 bg-white px-5 py-2 text-sm font-semibold text-[#5d4b3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] dark:border-stone-800 dark:bg-stone-950/70 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200">
              Curiosidades
            </span>
            <span className="shrink-0 cursor-pointer rounded-full border border-[#E58E35]/15 bg-white px-5 py-2 text-sm font-semibold text-[#5d4b3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] dark:border-stone-800 dark:bg-stone-950/70 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200">
              Saúde
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#E58E35]/15 bg-[#E58E35]/10 px-4 py-2 text-sm font-semibold text-[#8E4F00] dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200">
            <span className="h-2 w-2 rounded-full bg-[#E58E35]" />
            Navegação por categorias
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {paginatedItems.map((post) => {
            const author = authors?.find((item) => item.id === post.authorId);

            return (
              <PostCard key={post.id} post={post} author={author} />
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 py-6 select-none">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E58E35]/15 bg-white text-[#5d4b3d] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200"
            aria-label="Página anterior"
          >
            <FaArrowLeft className="text-sm" />
          </button>

          {paginationRange.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={index}
                  className="flex h-11 min-w-11 items-center justify-center rounded-full border border-dashed border-[#E58E35]/20 bg-white px-4 font-semibold text-[#8E4F00] dark:border-stone-800 dark:bg-stone-900 dark:text-amber-200"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === item;

            return (
              <button
                key={index}
                onClick={() => goToPage(Number(item))}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-11 min-w-11 items-center justify-center rounded-full px-4 font-semibold transition-all duration-300
                  
                  ${
                    isActive
                      ? "bg-[#8E4F00] font-bold text-white shadow-[0_16px_30px_rgba(142,79,0,0.18)] dark:bg-amber-500 dark:text-stone-950"
                      : "border border-[#E58E35]/15 bg-white text-[#5d4b3d] hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200"
                  }
                `}
              >
                {item}
              </button>
            );
          })}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E58E35]/15 bg-white text-[#5d4b3d] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E58E35]/30 hover:text-[#8E4F00] disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-400/20 dark:hover:text-amber-200"
            aria-label="Próxima página"
          >
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}
