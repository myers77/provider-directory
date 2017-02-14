import { compose, contains, filter, isEmpty, map, match, prop, reverse, sortBy, toLower, values } from 'ramda';
import { REVERSE, SORT, SEARCH } from '../actions';
import seedData from '../data/giant_data.json';

const details = [
  'last_name',
  'first_name',
  'email_address',
  'specialty',
  'practice_name',
];
const sorting = details[0];

const list = (state = {
  data: sortBy(compose(toLower, prop(sorting)), seedData),
  details,
  sorting,
  reversed: false,
  isSearched: false,
  searchedData: sortBy(compose(toLower, prop(sorting)), seedData),
  searchQuery: '',
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
        searchedData: sortByAttr(state.searchedData),
        sorting: order,
        reversed: false,
      };
    }
    case SEARCH: {
      const { searchQuery } = action;
      let searchedData = state.data;

      if (searchQuery) {
        const matches = (object) => {
          const re = new RegExp(searchQuery, 'i');
          return !isEmpty(match(re, object));
        };

        const containsMatch = object =>
          contains(true, map(matches, values(object)));

        // const searchedList = map(filter(match()), data);
        searchedData = filter(containsMatch, state.data);
        console.log(searchedData);
      }

      return {
        ...state,
        searchQuery,
        isSearched: !!searchQuery,
        searchedData,
      };
    }
    default:
      return state;
  }
};

export default list;
