import { IComment } from 'src/types';

const baseUrl = 'http://localhost:3004/comments';

export async function getComments(): Promise<IComment[]> {
  const response = await fetch(`${baseUrl}`);
  const comments: IComment[] = await response.json();
  return comments;
}

export async function getCommentsFilteredByAny(value: string): Promise<IComment[]> {
  const response = await fetch(`${baseUrl}?q=${value}`);
  const comments: IComment[] = await response.json();
  return comments;
}

export async function getCommentsFilteredBy(filterParam: keyof IComment, value: string): Promise<IComment[]> {
  const response = await fetch(`${baseUrl}?${filterParam}_like=${value}`);
  const comments: IComment[] = await response.json();
  return comments;
}