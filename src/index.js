import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import list from './reducers/list';
import App from './components/App';
import data from './data/data.json';

// Needed for onTouchTap
injectTapEventPlugin();

const headers = [
  'last_name',
  'first_name',
  'email_address',
  'specialty',
  'practice_name'
]

const initialState = {
  data,
  headers,
}

const enhancer = compose(applyMiddleware(createLogger()));
const store = createStore(list, initialState, enhancer);

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
