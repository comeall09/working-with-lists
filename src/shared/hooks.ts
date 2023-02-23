import { useEffect, useState } from 'react';
import { IPhoto } from './types';
import { getPhotos } from './api';

export function usePhotos() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const album = await getPhotos(page);
        setPhotos(album);
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

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const newPhotos = await getPhotos(page);
        const updatedList = (await [...(photos ? photos : []), ...newPhotos]) ?? null;
        setPhotos(updatedList);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
        console.log('finally');
      }
    }
    setLoading(true);
    fetchPhotos();
  }, [page]);

  return { photos, loading, error, setPage };
}