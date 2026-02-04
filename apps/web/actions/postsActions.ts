'use server';

import { ActionResult } from "next/dist/shared/lib/app-router-types";
import { cookies } from "next/headers";

const API_URL = 'http://localhost:4011/'

export async function createNewPost(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("user")?.value;

    if (!cookie) {
      return { success: false, message: "Usuário não autenticado" };
    }

    const data = JSON.parse(cookie);

    if (!data.token) {
      return { success: false, message: "Token de autenticação não encontrado." };
    }

    const image = formData.get("postImageUrl") as File | null;
    const title = formData.get("title")?.toString() ?? "";
    const category = formData.get("category")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";

    const body = new FormData();

    body.append("authorId", String(data.id));
    body.append("title", title);
    body.append("category", category);
    body.append("description", description);

    if (image) {
      body.append("postImageUrl", image, image.name);
    }

    const res = await fetch(`${API_URL}posts/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(error);
      return { success: false, message: "Erro ao criar postagem" };
    }

    return { success: true, message: "Post criado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Falha ao criar novo post" };
  }
}

export async function createComment(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("user")?.value;

    if (!cookie) {
      return { success: false, message: "Usuário não autenticado" };
    }

    const data = JSON.parse(cookie);

    const postId = Number(formData.get('postId'));
    const authorId = Number(formData.get('authorId'));
    const name = formData.get('name')?.toString();
    const content = formData.get('content')?.toString();

    if (!postId || !authorId || !content) {
      return { success: false, message: "Dados inválidos" };
    }

    console.log({
      postId,
      authorId,
      name,
      content,
    });

    const res = await fetch(`${API_URL}comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        authorId,
        name,
        content,
      }),
      cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(error);
      return { success: false, message: "Erro ao criar comentário!" };
    }

    return { success: true, message: "Comentário criado com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Falha ao criar novo comentário" };
  }
}
