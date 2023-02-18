import { ChangeEvent } from 'react';
import { Loader } from './Loader';

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

export function InputWithLoader({ value, onChange, loading }: IProps) {
  return (
    <div className='flex gap-3 input relative cursor-text'>
      <input
        className='bg-inherit w-full focus:outline-none pr-10'
        placeholder='Type something...'
        value={value}
        onChange={onChange}
      />
      {loading && (
        <div className='absolute right-2 top-[6px]'>
          <Loader />
        </div>
      )}
    </div>
  );
}