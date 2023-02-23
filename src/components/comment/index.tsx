import { IComment } from 'src/types';

export function Comment({ name, email, body }: IComment) {
  return (
    <div className='item'>
      <p>
        <span>name: </span>
        {name}
      </p>
      <p>
        <span>email: </span>
        {email}
      </p>
      <p>
        <span>text: </span>
        {body}
      </p>
    </div>
  );
}
