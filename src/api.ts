import { IPhoto } from './types';

export async function getPhotos(): Promise<IPhoto[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photos: IPhoto[] = await response.json();
  return photos;
}