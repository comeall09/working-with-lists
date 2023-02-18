import { useState, useEffect } from 'react';
import { IComponentProps } from 'src/types';
import { useFilterByAny } from './hooks';

export function FilterByAny({ comments, loading, error }: IComponentProps) {
  const [inputValue, setInputValue] = useState('');
  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    localStorage.setItem('queryAny', value);
  }

  // filter by any value
  const filteredCommentsByAny = useFilterByAny({ comments: comments ?? [], filterValue: inputValue });

  useEffect(() => {
    const initQueryAnyValue = localStorage.getItem('queryAny');
    if (initQueryAnyValue) {
      setInputValue(initQueryAnyValue);
    }
  }, []);
  return (
    <div>
      <label className='form'>
        <p>Filter by any field</p>
        <input className='input' placeholder='Type something...' value={inputValue} onChange={handleChange} />
      </label>
      <div className='content'>
        {!loading && error && <p className='status'>Oops... something went wrong&#40;</p>}
        {loading && <p className='status'>loading ...</p>}
        {!loading &&
          filteredCommentsByAny?.map(({ id, name, email, body }) => (
            <div key={id} className='item'>
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
          ))}
      </div>
    </div>
  );
}
