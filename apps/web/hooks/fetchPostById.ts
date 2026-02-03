export async function fetchPostById(id: number) {
    const res = await fetch(`http://localhost:4011/posts/` + id, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar post');
    }

    const data = await res.json();

    return data;
}