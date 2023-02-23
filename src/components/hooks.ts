import { useEffect, useState } from 'react';
import { getComments } from '../api';
import { IComment } from '../types';

export function useComments() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        const album = await getComments();
        setComments(album);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    fetchComments();
  }, []);

  return { comments, loading, error };
}