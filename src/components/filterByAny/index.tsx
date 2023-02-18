import { useState, useEffect, ChangeEvent } from 'react';
import { IComment, IComponentProps } from 'src/types';

import { getCommentsFilteredByAny as getCommentsQuery } from 'src/api';
import { updateSearchParams } from 'src/helpers';

import { Comment } from 'src/components/comment';
import { InputWithLoader } from 'src/components/shared/InputWithLoader';

const TIMEOUT_DELAY = 1000;
const SEARCH_PARAM = 'searchAny';

export function FilterByAnyRemotely({ comments, loading, error }: IComponentProps) {
  const [inputValue, setInputValue] = useState('');

  const [filtered, setFiltered] = useState<IComment[] | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [timeOutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  function fetchFilteredComments(value: string) {
    clearTimeout(timeOutId);
    if (value.length) {
      updateSearchParams(SEARCH_PARAM, value);
      const newTimeOutId = setTimeout(async () => {
        try {
          setFilterLoading(true);
          const filteredComments = await getCommentsQuery(value);
          setFiltered(filteredComments);
        } catch (err) {
          console.log(err);
        } finally {
          setFilterLoading(false);
        }
      }, TIMEOUT_DELAY);
      setTimeoutId(newTimeOutId);
    } else {
      setFiltered(null);
      updateSearchParams(SEARCH_PARAM, value);
    }
  }

  // триггерим запрос на изменение инпута
  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    fetchFilteredComments(value);
    localStorage.setItem(SEARCH_PARAM, value);
  }

  // триггерим запрос если ранее что-то вводилось
  useEffect(() => {
    const initQueryAnyValue = localStorage.getItem(SEARCH_PARAM);
    if (initQueryAnyValue) {
      setInputValue(initQueryAnyValue);
      fetchFilteredComments(initQueryAnyValue);
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
        {!loading && !filtered?.length
          ? comments?.map((comment) => <Comment key={comment.id} {...comment} />)
          : filtered?.map((comment) => <Comment key={comment.id} {...comment} />)}
      </div>
    </>
  );
}