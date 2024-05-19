import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from "../actions/index.js";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const UserByEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER_REQUEST:
      return { ...state, loading: true };

    case SEARCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case SEARCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
