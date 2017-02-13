import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import directoryApp from './reducers/index.js';
import App from './components/App';


// Needed for onTouchTap
injectTapEventPlugin();

// const initialState = {
//   attributes,
// }

// const enhancer = compose(applyMiddleware(createLogger()));
// const store = createStore(directoryApp, initialState, enhancer);
// const store = createStore(directoryApp, enhancer);
const store = createStore(
  directoryApp, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
