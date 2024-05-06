import {
  FETCH_CITY_REQUEST,
  FETCH_CITY_SUCCESS,
  FETCH_CITY_FAILURE,
} from "../actions";

const initialState = {
  city: null,
  isLoading: false,
  error: null,
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        city: action.payload,
      };
    case FETCH_CITY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cityReducer;
