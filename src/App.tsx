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
    try {
      setLoading(true);
      getPhotos().then((album) => {
        setPhotos(album);
        setVisiblePhotos(album.filter((data, i) => i < 50));
      });
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }

    const refElement = blockRef.current;
    refElement?.addEventListener('scroll', handleScroll);
    return () => refElement?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);
    const updatedList = photos?.slice(0, count) ?? null;

    setTimeout(() => {
      setVisiblePhotos(updatedList);
      setLoading(false);
    }, 1000);
  }, [count]);

  return (
    <div className='main'>
      <p className='title'>Basic infinite scroll</p>
      <div ref={blockRef} className='content'>
        {visiblePhotos?.map(({ id, title, thumbnailUrl }) => (
          <div key={id} className='item'>
            <img src={thumbnailUrl} alt={title} className='rounded-2xl' />
            <p>{title}</p>
          </div>
        ))}
        {error && <p>Oops... something went wrong&#40;</p>}
        {loading && <p className='loading'>loading...</p>}
      </div>
    </div>
  );
}
