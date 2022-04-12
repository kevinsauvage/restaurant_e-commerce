import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import cart from './cart/reducer';
import user from './user/reducer';

const combinedReducer = combineReducers({
  cart,
  user,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      cart: {
        items: [
          ...new Set([...action.payload.items.items, ...state.items.items]),
        ],
      },
    };
    return nextState;
  }

  return combinedReducer(state, action);
};

const initStore = () =>
  createStore(masterReducer, composeWithDevTools(applyMiddleware()));

const wrapper = createWrapper(initStore);
export default wrapper;
