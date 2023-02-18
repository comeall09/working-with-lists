import { useState, useEffect } from 'react';

import { FilterBySelected } from './components/filterBySelected';
import { FilterByAny } from './components/filterByAny';

import { IComment } from './types';
import { getPhotos } from './api';
import './styles.css';

export function App() {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const album = await getPhotos();
        setComments(album);
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

  return (
    <div className='main'>
      <FilterByAny comments={comments} loading={loading} error={error} />
      <FilterBySelected comments={comments} loading={loading} error={error} />
    </div>
  );
}
