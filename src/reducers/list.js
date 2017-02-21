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
  TOGGLE_SHOW_ADD_ROW,
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

const list = (state = initialState, action) => {
  switch (action.type) {
    case REVERSE:
      return {
        ...state,
        searchedData: reverse(state.searchedData),
        reversed: !state.reversed,
      };
    case SORT: {
      const { sorting } = action;
      const sortByAttr = sortBy(compose(toLower, prop(sorting)));
      const searchedData = state.reversed ? reverse(sortByAttr(state.searchedData))
          : sortByAttr(state.searchedData);
      return {
        ...state,
        searchedData,
        sorting,
      };
    }
    case SEARCH: {
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
    }
    case TOGGLE_SHOW_ADD_ROW:
      return {
        ...state,
        showAddRow: !state.showAddRow,
      };
    case TOGGLE_SELECTED_ENTRY: {
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
    }
    case DELETE_SELECTED_ROWS: {
      const { selectedEntries, data } = action;
      const newData = without(selectedEntries, data);
      return {
        ...state,
        data: newData,
        selectedEntries: [],
      };
    }
    case TOGGLE_NEW_PROVIDER_DIALOG:
      return {
        ...state,
        showNewProviderDialog: !state.showNewProviderDialog,
      };
    case UPDATE_NEW_PROVIDER: {
      const { attribute, value } = action;
      newProvider[attribute] = value;
      return {
        ...state,
        newProvider,
      };
    }
    case CLEAR_NEW_PROVIDER:
      return {
        ...state,
        newProvider: map(() => '', newProvider),
      };
    case ADD_NEW_PROVIDER: {
      const data = append(clone(newProvider), state.data);
      return {
        ...state,
        data,
      };
    }
    default:
      return state;
  }
};

// const list = (state = initialState, action) => {
//   switch(action.type) {
//     case REVERSE:
//     case SORT:
//     case SEARCH:
//     case TOGGLE_SHOW_ADD_ROW:
//     case TOGGLE_SELECTED_ENTRY:
//     case DELETE_SELECTED_ROWS:
//     case OPEN_ADD_POPOVER:
//     case CLOSE_ADD_POPOVER:
//     case UPDATE_NEW_PROVIDER:
//     case CLEAR_NEW_PROVIDER:
//     case ADD_NEW_PROVIDER:
//   }
// }

export default list;
