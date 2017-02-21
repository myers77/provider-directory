import {
  append,
  clone,
  compose,
  contains,
  filter,
  isEmpty,
  map,
  match,
  prop,
  replace,
  reverse,
  sortBy,
  toLower,
  values,
  without,
} from 'ramda';

import {
  REVERSE,
  SORT,
  SEARCH,
  TOGGLE_SELECTED_ENTRY,
  DELETE_SELECTED_ROWS,
  TOGGLE_NEW_PROVIDER_DIALOG,
  UPDATE_NEW_PROVIDER,
  CLEAR_NEW_PROVIDER,
  ADD_NEW_PROVIDER,
}
from '../actions';

import seedData from '../data/data.json';

const details = [
  'last_name',
  'first_name',
  'email_address',
  'specialty',
  'practice_name',
];

const sortedData = sortBy(compose(toLower, prop(details[0])), seedData);

const newProvider = {
  last_name: '',
  first_name: '',
  email_address: '',
  specialty: '',
  practice_name: '',
};

const initialState = {
  data: sortedData,
  details,
  sorting: details[0],
  reversed: false,
  isSearched: false,
  searchedData: sortedData,
  searchQuery: '',
  showAddRow: false,
  selectedEntries: [],
  addPopover: false,
  newProvider,
  showNewProviderDialog: false,
};

const reverseList = state => ({
  ...state,
  searchedData: reverse(state.searchedData),
  reversed: !state.reversed,
});

const sort = (state, action) => {
  const { sorting } = action;
  const sortByAttr = sortBy(compose(toLower, prop(sorting)));
  const searchedData = state.reversed ? reverse(sortByAttr(state.searchedData))
      : sortByAttr(state.searchedData);
  return {
    ...state,
    searchedData,
    sorting,
  };
};

const search = (state, action) => {
  let { searchQuery } = action;
  let searchedData = state.data;
  if (searchQuery) {
    searchQuery = replace(/[[^$.|?*+()]/gi, '', searchQuery);

    const matches = (object) => {
      const re = new RegExp(searchQuery, 'i');
      return !isEmpty(match(re, object));
    };

    const containsMatch = object =>
      contains(true, map(matches, values(object)));

    searchedData = filter(containsMatch, state.data);
  }

  return {
    ...state,
    searchQuery,
    isSearched: !!searchQuery,
    searchedData,
  };
};

const toggleSelectedEntry = (state, action) => {
  const { selectedEntry } = action;
  let { selectedEntries } = action;
  if (!contains(selectedEntry, selectedEntries)) {
    selectedEntries = append(selectedEntry, selectedEntries);
  } else {
    selectedEntries = without([selectedEntry], selectedEntries);
  }
  return {
    ...state,
    selectedEntries,
  };
};

const deleteSelectedRows = (state, action) => ({
  ...state,
  data: without(action.selectedEntries, action.data),
  selectedEntries: [],
});

const toggleNewProviderDialog = state => ({
  ...state,
  showNewProviderDialog: !state.showNewProviderDialog,
});

const updateNewProvider = (state, action) => {
  const { attribute, value } = action;
  newProvider[attribute] = value;
  return {
    ...state,
    newProvider,
  };
};

const clearNewProvider = state => ({
  ...state,
  newProvider: map(() => '', newProvider),
});

const addNewProvider = state => ({
  ...state,
  data: append(clone(newProvider), state.data),
});

const list = (state = initialState, action) => {
  switch (action.type) {
    case REVERSE: return reverseList(state);
    case SORT: return sort(state, action);
    case SEARCH: return search(state, action);
    case TOGGLE_SELECTED_ENTRY: return toggleSelectedEntry(state, action);
    case TOGGLE_NEW_PROVIDER_DIALOG: return toggleNewProviderDialog(state, action);
    case DELETE_SELECTED_ROWS: return deleteSelectedRows(state, action);
    case UPDATE_NEW_PROVIDER: return updateNewProvider(state, action);
    case CLEAR_NEW_PROVIDER: return clearNewProvider(state);
    case ADD_NEW_PROVIDER: return addNewProvider(state);
    default: return state;
  }
};

export default list;
