import { useState, useEffect, ChangeEvent } from 'react';
import { IComponentProps } from 'src/types';

import { Comment } from 'src/components/comment';
import { InputWithLoader } from 'src/components/shared/InputWithLoader';
import { useFilteredByAny } from './hooks';

const SEARCH_PARAM = 'searchAny';

export function FilterByAnyRemotely({ comments, loading, error }: IComponentProps) {
  const [inputValue, setInputValue] = useState('');

  const { filteredComments, filterLoading, fetchComments } = useFilteredByAny();

  // триггерим запрос на изменение инпута
  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    fetchComments(value);
    localStorage.setItem(SEARCH_PARAM, value);
  }

  // триггерим запрос если ранее что-то вводилось
  useEffect(() => {
    const initQueryAnyValue = localStorage.getItem(SEARCH_PARAM);
    if (initQueryAnyValue) {
      setInputValue(initQueryAnyValue);
      fetchComments(initQueryAnyValue);
    }
  }, []);

  return (
    <>
      <label className='form'>
        <p>Filtering remotely</p>
        <InputWithLoader value={inputValue} onChange={handleChange} loading={filterLoading} />
      </label>
      <div className='content'>
        {!loading && !comments?.length && error && <p className='status'>Oops... something went wrong&#40;</p>}
        {loading && <p className='status'>loading ...</p>}
        {!loading && !filteredComments?.length
          ? comments?.map((comment) => <Comment key={comment.id} {...comment} />)
          : filteredComments?.map((comment) => <Comment key={comment.id} {...comment} />)}
      </div>
    </>
  );
}