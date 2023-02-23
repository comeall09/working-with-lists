import { useState } from 'react';
import { IComment, IComponentProps } from 'src/types';

import { Comment } from 'src/components/comment';
import { InputWithLoader } from 'src/components/shared/InputWithLoader';

import { updateSearchParams } from 'src/components/helpers';
import { useFilteredBySelected } from './hooks';

export function FilterBySelected({ comments, loading, error }: IComponentProps) {
  const { filteredComments, filterLoading, fetchComments, filterParam, setFilterParam } = useFilteredBySelected();

  function onChangeParam(param: keyof IComment) {
    setFilterParam(param);
    fetchComments(inputValue);
    updateSearchParams(param, inputValue);
  }

  const [inputValue, setInputValue] = useState(localStorage.getItem(filterParam) ?? '');

  function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value);
    fetchComments(value);
    localStorage.setItem(filterParam, value);
  }

  return (
    <div>
      <div className='form'>
        <div className='formTitle'>
          <p>Filter by: </p>
          <div className='flex gap-2'>
            {['name', 'email', 'body'].map((opt) => (
              <button
                key={opt}
                className={`${filterParam === opt && 'text-orange-400'}`}
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
        {!loading && !filteredComments?.length
          ? comments?.map((comment) => <Comment key={comment.id} {...comment} />)
          : filteredComments?.map((comment) => <Comment key={comment.id} {...comment} />)}
      </div>
    </div>
  );
}