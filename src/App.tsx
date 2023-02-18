import { useState, useEffect } from 'react';

import { IComment } from './types';
import { getComments } from './api';
import { FilterByAnyRemotely } from './components/filterByAny';
import { FilterBySelected } from './components/filterBySelected';
import './styles.css';

export function App() {
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

  return (
    <div className='main'>
      <div>
        <FilterByAnyRemotely comments={comments} loading={loading} error={error} />
      </div>
      <div>
        <FilterBySelected comments={comments} loading={loading} error={error} />
      </div>
    </div>
  );
}
