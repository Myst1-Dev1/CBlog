import { create } from 'zustand';
import { Post } from '../../@types/Post';

const API_URL = 'http://localhost:4011/';

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