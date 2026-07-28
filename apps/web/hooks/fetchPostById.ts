export async function fetchPostById(id: number) {
    const res = await fetch(`https://lab.mystdev.com.br/api/cblog/posts/` + id, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar post');
    }

    const data = await res.json();

    return data;
}