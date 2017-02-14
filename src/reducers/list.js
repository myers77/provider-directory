import { compose, prop, reverse, sortBy, toLower } from 'ramda';

import {
  REVERSE,
  SORT,
  SEARCH,
} from '../actions';

import data from '../data/data.json';

const details = [
  'last_name',
  'first_name',
  'email_address',
  'specialty',
  'practice_name',
];

const sorting = details[0];
const reversed = false;
const isSearched = false;
const searchQuery = '';
const searchedData = [];

const sortedData = sortBy(compose(toLower, prop(sorting)), data);

const list = (state = {
  data: sortedData,
  details,
  sorting,
  reversed,
  isSearched,
  searchedData,
}, action) => {
  switch (action.type) {
    case REVERSE:
      return {
        ...state,
        data: reverse(state.data),
        reversed: !state.reversed,
      };
    case SORT: {
      const sortByAttr = sortBy(compose(toLower, prop(action.order)));
      return {
        ...state,
        data: sortByAttr(state.data),
        sorting: action.order,
        reversed: false,
      };
    }
    case SEARCH:
      return {
        ...state,
        searchQuery: action.searchQuery,
        isSearched: !!searchQuery,
      };
    default:
      return state;
  }
};

export default list;
