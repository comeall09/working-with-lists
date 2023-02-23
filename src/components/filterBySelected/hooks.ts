import { useState, useEffect } from 'react';
import { IComment } from 'src/types';
import { isEqual } from 'src/components/helpers';

// helper
function filterListBy(list: IComment[] = [], value = '', key: keyof IComment) {
  if (list.length) {
    return list.filter((obj) => {
      if (obj[key].toString().toLocaleLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
  return list;
}

// hook
interface IPropsWithValue {
  comments: IComment[];
  filterValue: string;
}

export function useFilterByValue({ comments, filterValue }: IPropsWithValue) {
  const [filteredComments, setFilteredComments] = useState(comments);
  const [filterParam, setFilterParam] = useState<keyof IComment>('name');

  const filtered = filterListBy(comments, filterValue, filterParam);

  useEffect(() => {
    // update location href
    const url = new URL(window.location.href);
    if (filterValue) {
      url.searchParams.set('query', filterValue);
    } else {
      url.searchParams.delete('query');
    }
    window.history.replaceState(null, '', url);

    // filtering
    if (!isEqual(filtered, filteredComments)) {
      setFilteredComments(filterListBy(comments, filterValue, filterParam));
    }
  }, [comments, filterValue, filteredComments, filtered, filterParam]);

  return {filteredComments, filterParam, setFilterParam };
}