import { compose, prop, reverse, sortBy, toLower } from 'ramda';

import {
  REVERSE,
  SORT,
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

const list = (state = { data, details, sorting, reversed }, action) => {
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
      };
    }
    default:
      return state;
  }
};

export default list;
