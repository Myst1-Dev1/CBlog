'use server';

import { fetchAllPosts } from "../../hooks/fetchAllPosts";
import { PostsContent } from "../../components/postsContent";

export default async function Posts() {
    const data = await fetchAllPosts();

    return (
        <>
            <PostsContent data={data} />
        </>
    )
}