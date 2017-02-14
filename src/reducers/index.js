import { combineReducers } from 'redux';
import list from './list';

const directoryApp = combineReducers({
  list,
});

export default directoryApp;
