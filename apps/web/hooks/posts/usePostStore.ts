import { create } from 'zustand';
// import Cookies from 'js-cookie';

const API_URL = 'http://localhost:4011/';

type Post = {
    id: number;
    authorId: number;
    title: string;
    category: string;
    description: string;
    postImageUrl: string;
}

type PostState = {
    post: Post[] | null;
    loading: boolean;
    error: string | null;

    fetchPostData: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
    post: null,
    loading: false,
    error: null,
    fetchPostData: async () => {
        const res = await fetch(`${API_URL}posts`, {
            method: 'GET',
            cache: 'no-store',
            next: {
                tags: ['posts']
            }
        });

        if (!res.ok) {
            throw new Error('Erro ao buscar posts');
        }

        const data = await res.json();

        set({
            post: data,
            loading: false
        })
    }
}))