import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import GameContainer from './containers/GameBoardContainer';
import configureStore from './store';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('root'),
);
