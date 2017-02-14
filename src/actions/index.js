export const SORT = 'SORT';
export const REVERSE = 'REVERSE';
export const SEARCH = 'SEARCH';

export const sort = order => ({
  type: SORT,
  order,
});

export const reverse = () => ({
  type: REVERSE,
});

export const search = searchQuery => ({
  type: SEARCH,
  searchQuery,
});
