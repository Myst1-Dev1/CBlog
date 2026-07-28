const API_URL = 'https://lab.mystdev.com.br/api/cblog/';

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