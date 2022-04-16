import { userActionTypes } from './action';

const cartInitialState = {
  user: {},
  selectedItem: undefined,
};

export default function reducer(state = cartInitialState, action) {
  switch (action.type) {
    case userActionTypes.ADD_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    case userActionTypes.ADD_SELECTED_ITEM: {
      return {
        ...state,
        selectedItem: action.item,
      };
    }

    default:
      return state;
  }
}
