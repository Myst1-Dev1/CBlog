'use server';

import { HealthFood } from "../components/home/healthFood";
import { History } from "../components/home/history";
import { Intro } from "../components/home/Intro";
import { Posts } from "../components/home/posts";
import { Races } from "../components/home/races";
import { fetchAllPosts } from "../hooks/fetchAllPosts";

export default async function Home() {
  const data = await fetchAllPosts();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_55%)]" />
      <div className="pointer-events-none absolute right-[-8%] top-[680px] z-0 h-[340px] w-[340px] rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative z-10">
        <Intro />
        <History />
        <Races />
        <HealthFood />
        {/* <BlogAuthor /> */}
        <Posts data={data} />
      </div>
    </main>
  );
}
