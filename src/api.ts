import { IComment } from './types';

export async function getPhotos(): Promise<IComment[]> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=1&_limit=100`);
  const comments: IComment[] = await response.json();
  return new Promise((ok) => {
    setTimeout(() => {
      ok(comments);
    }, 1000);
  });
}