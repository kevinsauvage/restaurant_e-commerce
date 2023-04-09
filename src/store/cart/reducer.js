/* eslint-disable unicorn/prefer-spread */
import { cartActionTypes } from './action';

const cartInitialState = {
  items: [],
};

const handleUpdateCart = (state, action) => {
  const { item, quantity } = action;

  const exist = state.items.find((element) => element.product.name === item.name);

  if (exist) {
    if (!quantity) {
      const newItems = state.items.filter((element) => element.product.name !== item.name);
      return { ...state, items: newItems };
    }

    const newItems = state.items.map((element) => {
      if (element.product.name === item.name) return { product: item, quantity };
      return element;
    });

    return { ...state, items: newItems };
  }
  return {
    ...state,
    items: [...state.items, { product: item, quantity }],
  };
};

const reducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case cartActionTypes.UPDATE_CART: {
      return handleUpdateCart(state, action);
    }

    case cartActionTypes.SET_INITIAL_STATE: {
      return {
        ...state,
        items: action.items,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
