import { compose, prop, reverse, sortBy, toLower } from 'ramda';
import { REVERSE, SORT, SEARCH } from '../actions';
import seedData from '../data/data.json';

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
  searchQuery: '',
}, action) => {
  switch (action.type) {
    case REVERSE:
      return {
        ...state,
        data: reverse(state.data),
        reversed: !state.reversed,
      };
    case SORT: {
      const { order } = action;
      const sortByAttr = sortBy(compose(toLower, prop(order)));
      return {
        ...state,
        data: sortByAttr(state.data),
        sorting: order,
        reversed: false,
      };
    }
    case SEARCH: {
      const { searchQuery } = action;
      return {
        ...state,
        searchQuery,
        isSearched: !!searchQuery,
      };
    }
    default:
      return state;
  }
};

export default list;
