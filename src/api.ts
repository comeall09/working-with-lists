import { IPhoto } from './types';

function generateRGB(): string {
  const r = Math.floor(Math.random() * 256); // generates a random value between 0 and 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // combine the red, green, and blue values into a single string with CSS rgb() format
  const color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

  // return the random color
  return color;
}

export async function getPhotos(page: number): Promise<IPhoto[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=20`);
  const photos: IPhoto[] = await response.json();
  return new Promise((ok) => {
    setTimeout(() => {
      ok(photos.map((item) => ({ ...item, color: generateRGB() })));
    }, 1000);
  });
}