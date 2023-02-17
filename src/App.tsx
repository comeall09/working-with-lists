import { useCallback, useEffect, useRef, useState } from 'react';
import { getPhotos } from './api';
import './styles.css';
import { IPhoto } from './types';

export function App() {
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState<IPhoto[] | null>(null);
  const [count, setCount] = useState(20); // default visible elements count

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // content wrapper
  const blockRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = blockRef.current?.scrollTop ?? 0;
    const clientHeight = blockRef.current?.clientHeight ?? 0;
    const scrollHeight = blockRef.current?.scrollHeight ?? 0;

    if (scrollTop + clientHeight >= scrollHeight) {
      setCount((prev) => prev + 20);
    }
  }, []);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const album = await getPhotos();
        setPhotos(album);
        setVisiblePhotos(album.slice(0, count));
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
    if (photos) {
      setLoading(true);
      const updatedList = photos?.slice(0, count);
      setTimeout(() => {
        setVisiblePhotos(updatedList);
        setLoading(false);
      }, 1000);
    }
  }, [count]);

  return (
    <div className='main'>
      <p className='title'>Basic infinite scroll</p>
      <div ref={blockRef} className='content'>
        {visiblePhotos?.map(({ id, title, color }) => (
          <div key={id} className='item'>
            <p style={{ backgroundColor: color }} className={'img'}>
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
