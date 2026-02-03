

export function getAuthorByPost(post: any, users: any) {
  return users.find((user:any) => user.id === post.authorId);
}