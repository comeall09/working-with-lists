import { useState, useEffect } from 'react';
import { getPhotos } from './api';
import { IPhoto } from './types';

export function usePhotos(initCount: number) {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState<IPhoto[] | null>(null);

  const [photosCount, setPhotosCount] = useState(initCount);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const album = await getPhotos();
        setPhotos(album);
        setVisiblePhotos(album.slice(0, photosCount));
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
    if (photos) {
      setLoading(true);
      const updatedList = photos?.slice(0, photosCount);
      setTimeout(() => {
        setVisiblePhotos(updatedList);
        setLoading(false);
      }, 1000);
    }
  }, [photos, photosCount]);

  return { photos: visiblePhotos, loading, error, setPhotosCount };
}