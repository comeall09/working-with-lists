export function updateSearchParams(param: string, value: string) {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  if (value.length) {
    searchParams.forEach((val, key) => searchParams.delete(key)); // clear prev params
    searchParams.set(param, value);
  } else {
    url.searchParams.delete(param);
  }
  window.history.replaceState(null, '', url);
}