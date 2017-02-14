export const SORT = 'SORT';
export const REVERSE = 'REVERSE';
export const SEARCH = 'SEARCH';
export const TOGGLE_SHOW_ADD_ROW = 'TOGGLE_SHOW_ADD_ROW';
export const UPDATE_SELECTED_ROWS = 'UPDATE_SELECTED_ROWS';
export const DELETE_SELECTED_ROWS = 'DELETE_SELECTED_ROWS';

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

export const toggleShowAddRow = () => ({
  type: TOGGLE_SHOW_ADD_ROW,
});

export const updateSelectedEntries = selectedEntries => ({
  type: UPDATE_SELECTED_ROWS,
  selectedEntries,
});

export const deleteSelectedEntries = (selectedEntries, data) => ({
  type: DELETE_SELECTED_ROWS,
  selectedEntries,
  data,
});
