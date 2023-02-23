import { useState } from 'react';
import { IComment } from 'src/types';

import { updateSearchParams } from 'src/components/helpers';
import { getCommentsFilteredByAny as getCommentsQuery } from 'src/api';

const TIMEOUT_DELAY = 1000;
const SEARCH_PARAM = 'searchAny';

export function useFilteredByAny() {
  const [filteredComments, setFilteredComments] = useState<IComment[] | null>(null);
  const [filterLoading, setFilterLoading] = useState(false);
  const [timeOutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  function fetchComments(value: string) {
    clearTimeout(timeOutId);
    if (value.length) {
      updateSearchParams(SEARCH_PARAM, value);
      const newTimeOutId = setTimeout(async () => {
        try {
          setFilterLoading(true);
          const comments = await getCommentsQuery(value);
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
      updateSearchParams(SEARCH_PARAM, value);
    }
  }

  return { filteredComments, filterLoading, fetchComments };
}