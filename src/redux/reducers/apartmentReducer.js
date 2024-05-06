import {
  FETCH_APARTMENTS,
  FETCH_APARTMENTS_SUCCESS,
  FETCH_APARTMENTS_FAILURE,
  SELECT_APARTMENT,
} from "../actions";

const initialState = {
  apartments: [],
  selectedApartment: null,
  isLoading: true,
  error: null,
};

const apartmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APARTMENTS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_APARTMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        apartments: action.payload,
      };
    case FETCH_APARTMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SELECT_APARTMENT:
      return {
        ...state,
        selectedApartment: action.payload,
      };
    default:
      return state;
  }
};

export default apartmentReducer;
