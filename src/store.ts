import { createStore, compose } from 'redux';

import rootReducer from './reducers';

const composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    (window as any).window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

const store = createStore(
  rootReducer,
  { selectedPath: 'myDay' },
  composeEnhancers
);

export default store;
