

export async function getComments(id:number) {
    try {
        const res = await fetch('http://localhost:4011/comments/' + id, {
            method:'GET',
            next: { tags: [ 'comments' ] }
        })

        const data = await res.json();

        return data;
    } catch (error) {
        console.log('Tivemos um erro ao pegar os comentários', error);
    }
}