/* eslint-disable unicorn/prefer-spread */
import { cartActionTypes } from './action';

const cartInitialState = {
  items: [],
};

const handleAdd = (state, action) => {
  const exist = state.items.find((element) => element.product.name === action.item.name);

  if (exist) {
    const newItems = state.items.map((element) => {
      if (element.product.name === action.item.name)
        return {
          product: action.item,
          quantity: Number(element.quantity) + Number(action.quantity),
        };
      return element;
    });

    return {
      ...state,
      items: newItems,
    };
  }
  const newItems = [...state.items, { product: action.item, quantity: Number(action.quantity) }];

  return {
    ...state,
    items: newItems,
  };
};

const handleRemove = (state, action) => {
  const newItems = state.items.reduce((result, element) => {
    if (element.product.name === action.item.name) {
      if (Number(element.quantity) > 1) {
        return result.concat({
          product: action.item,
          quantity: Number(element.quantity) - 1,
        });
      }
    } else return [...result, ...(Array.isArray(element) ? element : [element])];

    return result;
  }, []);

  return {
    ...state,
    items: newItems,
  };
};

const reducer = (state = cartInitialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_ITEM: {
      return handleAdd(state, action);
    }

    case cartActionTypes.REMOVE_ITEM: {
      return handleRemove(state, action);
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
