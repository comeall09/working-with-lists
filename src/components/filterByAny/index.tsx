import { useState, useEffect } from 'react';
import { IComponentProps } from 'src/types';

import { Comment } from 'src/components/comment';
import { useFilterByAny } from './hooks';

export function FilterByAny({ comments, loading, error }: IComponentProps) {
  const [inputValue, setInputValue] = useState('');

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    localStorage.setItem('queryAny', value);
  }

  const { filteredComments } = useFilterByAny({ comments: comments ?? [], filterValue: inputValue });

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
        {!loading && filteredComments?.map((comment) => <Comment key={comment.id} {...comment} />)}
      </div>
    </div>
  );
}
