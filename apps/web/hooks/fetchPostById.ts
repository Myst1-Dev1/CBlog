export async function fetchPostById(id: number) {
    try {
        const res = await fetch(`https://lab.mystdev.com.br/api/cblog/posts/` + id, {
            cache: 'no-store',
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();

        return data;
    } catch {
        return null;
    }
}