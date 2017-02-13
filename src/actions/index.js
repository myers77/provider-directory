export const SORT = 'SORT';
export const REVERSE = 'REVERSE';

export const sort = order => ({
  type: SORT,
  order,
});

export const reverse = () => ({
  type: REVERSE,
});
