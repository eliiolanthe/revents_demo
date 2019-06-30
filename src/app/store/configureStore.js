import { createStore } from 'redux';
import testReducer from '../../features/testarea/testReducer';

export const configureStore = () => {
  const store = createStore(
    testReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
