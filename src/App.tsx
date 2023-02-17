import { useCallback, useEffect, useRef, useState } from 'react';
import { getPhotos } from './api';
import { IPhoto } from './types';
import './styles.css';

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // content wrapper
  const blockRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = blockRef.current?.scrollTop ?? 0;
    const clientHeight = blockRef.current?.clientHeight ?? 0;
    const scrollHeight = blockRef.current?.scrollHeight ?? 0;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }, []);

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

    const refElement = blockRef.current;
    refElement?.addEventListener('scroll', handleScroll);
    return () => refElement?.removeEventListener('scroll', handleScroll);
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

  return (
    <div className='main'>
      <p className='title'>Basic infinite scroll</p>
      <div ref={blockRef} className='content'>
        {photos?.map(({ id, title, color }) => (
          <div key={id} className='item'>
            <p style={{ backgroundColor: color }} className='img'>
              {id}
            </p>
            <p>{title}</p>
          </div>
        ))}
        {!loading && error && <p className='status'>Oops... something went wrong&#40;</p>}
        {loading && <p className='status'>loading...</p>}
      </div>
    </div>
  );
}
