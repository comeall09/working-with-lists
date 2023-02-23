import { useEffect, useState } from 'react';
import { IComment } from 'src/types';
import { getComments } from './api';

export function useComments() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const newComments = await getComments();
        setComments(newComments);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    setLoading(true);
    fetchPhotos();
  }, []);

  return { comments, loading, error };
}