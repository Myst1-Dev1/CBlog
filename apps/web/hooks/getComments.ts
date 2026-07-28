

export async function getComments(id:number) {
    try {
        const res = await fetch('https://lab.mystdev.com.br/api/cblog/comments/' + id, {
            method:'GET',
            next: { tags: [ 'comments' ] }
        })

        const data = await res.json();

        return data;
    } catch (error) {
        console.log('Tivemos um erro ao pegar os comentários', error);
    }
}