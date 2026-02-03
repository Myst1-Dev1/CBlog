const API_URL = 'http://localhost:4011/';

export async function fetchAllPosts() {
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

        return data;
}