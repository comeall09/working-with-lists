import { IPhoto } from './types';
import { generateRGB } from './helpers';

export async function getPhotos(): Promise<IPhoto[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=300');
  const photos: IPhoto[] = await response.json();
  return photos.map((item) => ({ ...item, color: generateRGB() }));
}