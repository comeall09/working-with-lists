import { useState, useEffect } from 'react';
import { IComment, IComponentProps } from 'src/types';

import { Comment } from 'src/components/comment';
import { useFilterByValue } from './hooks';

export function FilterBySelected({ comments, loading, error }: IComponentProps) {
  const [inputValue, setInputValue] = useState('');

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    localStorage.setItem('query', value);
  }

  const { filteredComments, filterParam, setFilterParam } = useFilterByValue({
    comments: comments ?? [],
    filterValue: inputValue,
  });

  useEffect(() => {
    const initQueryValue = localStorage.getItem('query');
    if (initQueryValue) {
      setInputValue(initQueryValue);
    }
  }, []);

  return (
    <div>
      <label className='form'>
        <div className='formTitle'>
          <p>Filter by: </p>
          <div className='flex gap-2'>
            {['name', 'email', 'body'].map((opt) => (
              <button
                key={opt}
                className={`${filterParam === opt && 'text-orange-400'}`}
                onClick={() => setFilterParam(opt as keyof IComment)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
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