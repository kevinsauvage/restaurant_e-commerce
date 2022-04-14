import { userActionTypes } from './action';

const cartInitialState = {
  user: {},
};

export default function reducer(state = cartInitialState, action) {
  switch (action.type) {
    case userActionTypes.ADD_USER: {
      return {
        ...state,
        user: action.user,
      };
    }

    default:
      return state;
  }
}
