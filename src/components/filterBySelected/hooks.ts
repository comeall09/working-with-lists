import { useState, useEffect } from 'react';
import { IComment } from 'src/types';
import { isEqual } from 'src/helpers';

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
  by: keyof IComment;
}

export function useFilterByValue({ comments, filterValue, by }: IPropsWithValue) {
  const [filteredPhotos, setFilteredPhotos] = useState(comments);

  const filtered = filterListBy(comments, filterValue, by);
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
    if (!isEqual(filtered, filteredPhotos)) {
      setFilteredPhotos(filterListBy(comments, filterValue, by));
    }
  }, [comments, filterValue, filteredPhotos, filtered, by]);

  return filteredPhotos;
}