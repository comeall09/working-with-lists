import { useState, useEffect } from 'react';
import { IComment, IComponentProps } from 'src/types';
import { useFilterByValue } from './hooks';

export function FilterBySelected({ comments, loading, error }: IComponentProps) {
  const [selectedFilterVal, setSelectedFilterVal] = useState<keyof IComment>('name');
  const [inputValue, setInputValue] = useState('');

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    localStorage.setItem('query', value);
  }

  const filteredByValue = useFilterByValue({
    comments: comments ?? [],
    filterValue: inputValue,
    by: selectedFilterVal,
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
                className={`${selectedFilterVal === opt && 'text-orange-400'}`}
                onClick={() => setSelectedFilterVal(opt as keyof IComment)}
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
        {!loading &&
          filteredByValue?.map(({ id, name, email, body }) => (
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