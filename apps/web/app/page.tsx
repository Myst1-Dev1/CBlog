'use server';

import { Intro } from "../components/home/Intro";
import { Pagination } from "../components/home/pagination";
import { PostsWithFilter } from "../components/home/postsWithFilter";

export default async function Home() {

  return (
    <>
      <Intro />
      <div className="container py-8">
        <h2 className="font-bold mb-3 text-2xl">Blog</h2>
        <p className="text-gray-400 font-medium">Nosso blog foi feito dedicado a abordar temas que envolvem essa raça de cachorros conhecida como Corgi.</p>
        <PostsWithFilter />
        <Pagination />
      </div>
    </>
  );
}
