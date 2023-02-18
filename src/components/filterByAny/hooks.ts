import { useState, useEffect } from 'react';
import { IComment } from 'src/types';
import { isEqual } from 'src/helpers';

// helper
function filterListByAnyValue(list: IComment[] = [], value = '') {
  if (list.length) {
    return list.filter((obj) => {
      for (const key in obj) {
        if (obj[key as keyof IComment].toString().toLowerCase().includes(value.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
  return list;
}

// hook
interface IAnyProps {
  comments: IComment[];
  filterValue: string;
}

export function useFilterByAny({ comments, filterValue }: IAnyProps) {
  const [filteredPhotos, setFilteredPhotos] = useState(comments);

  const filtered = filterListByAnyValue(comments, filterValue);
  useEffect(() => {
    // update location href
    const url = new URL(window.location.href);
    if (filterValue) {
      url.searchParams.set('queryAny', filterValue);
    } else {
      url.searchParams.delete('queryAny');
    }
    window.history.replaceState(null, '', url);

    // filtering
    if (!isEqual(filtered, filteredPhotos)) {
      setFilteredPhotos(filterListByAnyValue(comments, filterValue));
    }
  }, [comments, filterValue, filteredPhotos, filtered]);

  return filteredPhotos;
}
