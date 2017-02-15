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
  OPEN_ADD_POPOVER,
  CLOSE_ADD_POPOVER,
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
const sorting = details[0];

const newProvider = {
  last_name: '',
  first_name: '',
  email_address: '',
  specialty: '',
  practice_name: '',
};

const initialState = {
  data: sortBy(compose(toLower, prop(sorting)), seedData),
  details,
  sorting,
  reversed: false,
  isSearched: false,
  searchedData: sortBy(compose(toLower, prop(sorting)), seedData),
  searchQuery: '',
  showAddRow: false,
  selectedEntries: [],
  addPopover: false,
  newProvider,
};

const list = (state = {
  data: sortBy(compose(toLower, prop(sorting)), seedData),
  details,
  sorting,
  reversed: false,
  isSearched: false,
  searchedData: sortBy(compose(toLower, prop(sorting)), seedData),
  searchQuery: '',
  showAddRow: false,
  selectedEntries: [],
  addPopover: false,
  newProvider,
}, action) => {
  switch (action.type) {
    case REVERSE:
      return {
        ...state,
        searchedData: reverse(state.searchedData),
        reversed: !state.reversed,
      };
    case SORT: {
      const { order } = action;
      const sortByAttr = sortBy(compose(toLower, prop(order)));
      return {
        ...state,
        searchedData: state.reversed ? reverse(sortByAttr(state.searchedData))
          : sortByAttr(state.searchedData),
        sorting: order,
        reversed: state.reversed,
      };
    }
    case SEARCH: {
      let { searchQuery } = action;
      let searchedData = state.data;
      console.log(searchQuery);
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
    case OPEN_ADD_POPOVER:
      return {
        ...state,
        addPopover: true,
      };
    case CLOSE_ADD_POPOVER:
      return {
        ...state,
        addPopover: false,
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

export default list;
