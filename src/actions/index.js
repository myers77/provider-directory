export const SORT = 'SORT';
export const REVERSE = 'REVERSE';
export const SEARCH = 'SEARCH';
export const TOGGLE_SHOW_ADD_ROW = 'TOGGLE_SHOW_ADD_ROW';
export const TOGGLE_SELECTED_ENTRY = 'TOGGLE_SELECTED_ENTRY';
export const DELETE_SELECTED_ROWS = 'DELETE_SELECTED_ROWS';
export const TOGGLE_NEW_PROVIDER_DIALOG = 'TOGGLE_NEW_PROVIDER_DIALOG';
export const UPDATE_NEW_PROVIDER = 'UPDATE_NEW_PROVIDER';
export const CLEAR_NEW_PROVIDER = 'CLEAR_NEW_PROVIDER';
export const ADD_NEW_PROVIDER = 'ADD_NEW_PROVIDER';

export const sort = sorting => ({
  type: SORT,
  sorting,
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

export const toggleSelectedEntry = (selectedEntry, selectedEntries) => ({
  type: TOGGLE_SELECTED_ENTRY,
  selectedEntry,
  selectedEntries,
});

export const deleteSelectedEntries = (selectedEntries, data) => ({
  type: DELETE_SELECTED_ROWS,
  selectedEntries,
  data,
});

export const toggleNewProviderDialog = () => ({
  type: TOGGLE_NEW_PROVIDER_DIALOG,
});

export const updateNewProvider = (attribute, value) => ({
  type: UPDATE_NEW_PROVIDER,
  attribute,
  value,
});

export const clearNewProvider = () => ({
  type: CLEAR_NEW_PROVIDER,
});

export const addNewProvider = () => ({
  type: ADD_NEW_PROVIDER,
});
