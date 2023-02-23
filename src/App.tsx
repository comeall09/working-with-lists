import { useCallback, useEffect, useRef } from 'react';
import { usePhotos } from './shared/hooks';
import './styles.css';

export function App() {
  const { photos, loading, error, setPage } = usePhotos();

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
    const refElement = blockRef.current;
    refElement?.addEventListener('scroll', handleScroll);
    return () => refElement?.removeEventListener('scroll', handleScroll);
  }, []);

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
