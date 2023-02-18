import { useState, useEffect } from 'react';
import { IComment, IComponentProps } from 'src/types';

import { getCommentsFilteredBy as getCommentsQuery } from 'src/api';
import { updateSearchParams } from 'src/helpers';

import { Comment } from 'src/components/comment';
import { InputWithLoader } from 'src/components/shared/InputWithLoader';

const TIMEOUT_DELAY = 1000;

export function FilterBySelected({ comments, loading, error }: IComponentProps) {
  const [selectedFilterParam, setSelectedFilterParam] = useState<keyof IComment>('name');
  function onChangeParam(param: keyof IComment) {
    setSelectedFilterParam(param);
    fetchFilteredComments(inputValue);
    updateSearchParams(param, inputValue);
  }

  const [inputValue, setInputValue] = useState('');

  const [filtered, setFiltered] = useState<IComment[] | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [timeOutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  function fetchFilteredComments(value: string) {
    clearTimeout(timeOutId);
    if (value.length) {
      const newTimeOutId = setTimeout(async () => {
        try {
          setFilterLoading(true);
          const filteredComments = await getCommentsQuery(selectedFilterParam, value);
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
    }
    updateSearchParams(selectedFilterParam, value);
  }

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    fetchFilteredComments(value);
    localStorage.setItem(selectedFilterParam, value);
  }

  useEffect(() => {
    const initQueryValue = localStorage.getItem(selectedFilterParam);
    if (initQueryValue) {
      setInputValue(initQueryValue);
      fetchFilteredComments(initQueryValue);
    }
  }, []);

  return (
    <div>
      <div className='form'>
        <div className='formTitle'>
          <p>Filter by: </p>
          <div className='flex gap-2'>
            {['name', 'email', 'body'].map((opt) => (
              <button
                key={opt}
                className={`${selectedFilterParam === opt && 'text-orange-400'}`}
                onClick={() => onChangeParam(opt as keyof IComment)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <InputWithLoader value={inputValue} onChange={handleChange} loading={filterLoading} />
      </div>
      <div className='content'>
        {!loading && !comments?.length && error && <p className='status'>Oops... something went wrong&#40;</p>}
        {loading && <p className='status'>loading ...</p>}
        {!loading && !filtered?.length
          ? comments?.map((comment) => <Comment key={comment.id} {...comment} />)
          : filtered?.map((comment) => <Comment key={comment.id} {...comment} />)}
      </div>
    </div>
  );
}