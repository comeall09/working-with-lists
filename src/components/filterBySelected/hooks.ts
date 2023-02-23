import { useEffect, useState } from 'react';
import { IComment } from 'src/types';

import { getCommentsFilteredBy as getCommentsQuery } from 'src/api';
import { updateSearchParams } from 'src/components/helpers';

const TIMEOUT_DELAY = 1000;

export function useFilteredBySelected() {
  const [filteredComments, setFilteredComments] = useState<IComment[] | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [timeOutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const [filterParam, setFilterParam] = useState<keyof IComment>('name');

  function fetchComments(value: string) {
    clearTimeout(timeOutId);
    if (value.length) {
      const newTimeOutId = setTimeout(async () => {
        try {
          setFilterLoading(true);
          const comments = await getCommentsQuery(filterParam, value);
          setFilteredComments(comments);
        } catch (err) {
          console.log(err);
        } finally {
          setFilterLoading(false);
        }
      }, TIMEOUT_DELAY);
      setTimeoutId(newTimeOutId);
    } else {
      setFilteredComments(null);
    }
    updateSearchParams(filterParam, value);
  }

  useEffect(() => {
    const initQueryValue = localStorage.getItem(filterParam);
    if (initQueryValue) {
      fetchComments(initQueryValue);
    }
  }, []);

  return { filteredComments, filterLoading, fetchComments, filterParam, setFilterParam };
}