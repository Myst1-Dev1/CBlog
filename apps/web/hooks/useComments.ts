'use client';

import { useEffect, useState } from 'react';

export interface Comment {
  id: number;
  name: string;
  content: string;
  postId: number;
  authorId: number;
  createdAt: string;
}

export function useComments(authorId?: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    if (!authorId) return;

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:4011/comments/latest/${authorId}`,
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar comentários');
      }

      const data = await response.json();

      setComments(data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar comentários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [authorId]);

  return {
    comments,
    loading,
    error,
    refetch: fetchComments,
  };
}