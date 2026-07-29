const API_URL = "https://lab.mystdev.com.br/api/cblog/";

export async function fetchAllPosts() {
  try {
    const res = await fetch(`${API_URL}posts`, {
      method: "GET",
      cache: "no-store",
      next: {
        tags: ["posts"],
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    return data;
  } catch {
    return [];
  }
}
