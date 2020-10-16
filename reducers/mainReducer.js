import { ADD_COUNT } from '../actions/types';

const initialState = {
  count: {},
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: action.payload
      };
    default:
      return state;
  }
}

export default mainReducer;