import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cart from './cart/reducer';
import user from './user/reducer';

const initialState = {};

const combinedReducer = combineReducers({
  cart,
  user,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      cart: {
        items: [...new Set([...action.payload.items.items, ...state.items.items])],
      },
    };
  }

  return combinedReducer(state, action);
};

// BINDING MIDDLEWARE
const bindMiddleware = () => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware());
  }
  return applyMiddleware();
};

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['user', 'cart'], // State to persist
};

const makeStore = ({ isServer }) => {
  if (isServer) return createStore(masterReducer, {}, bindMiddleware());
  const persistedReducer = persistReducer(persistConfig, masterReducer);
  const store = createStore(persistedReducer, initialState, bindMiddleware());
  store.__persisitor = persistStore(store);
  return store;
};

const wrapper = createWrapper(makeStore);

export default wrapper;
