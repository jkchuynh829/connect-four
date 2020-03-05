import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import reducers from './reducers';

const combinedReducers = combineReducers(reducers);
const composeEnhancers = composeWithDevTools({});

const configureStore = (initial = initialState) => {
  const store = createStore(
    combinedReducers,
    initial,
    composeEnhancers(),
  );

  return store;
};

export default configureStore;
