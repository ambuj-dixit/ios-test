import {persistStore} from 'redux-persist';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import reducer from './reduxOperations';

const enhancer = compose(applyMiddleware(thunk));

// Root reducer with 'user_logout' handling
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

const configureStore = () => {
  const store = createStore(rootReducer, undefined, enhancer);

  const persistor = persistStore(store);
  return {persistor, store};
};

export const {persistor, store} = configureStore();
