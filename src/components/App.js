import React from 'react';

import List from './List';
import Header from './Header';

const style = {
  fontFamily: 'Roboto, sans-serif',
  textAlign: 'center',
  width: '80%',
  margin: 'auto',
};

const App = () =>
  <div style={style}>
    <Header />
    <List />
  </div>

export default App;
