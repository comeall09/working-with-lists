export interface IComment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IComponentProps {
  comments: IComment[] | null;
  loading: boolean;
  error: boolean;
}