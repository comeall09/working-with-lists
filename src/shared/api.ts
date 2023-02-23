import { IPhoto } from './types';
import { generateRGB } from './helpers';

export async function getPhotos(page: number): Promise<IPhoto[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=20`);
  const photos: IPhoto[] = await response.json();
  return new Promise((ok) => {
    setTimeout(() => {
      ok(photos.map((item) => ({ ...item, color: generateRGB() })));
    }, 1000);
  });
}