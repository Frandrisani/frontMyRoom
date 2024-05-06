import {
  FETCH_ROOMMATES,
  FETCH_ROOMMATES_SUCCESS,
  FETCH_ROOMMATES_FAILURE,
  SELECT_ROOMMATE,
} from "../actions";

const initialState = {
  roommates: [],
  selectedRoommate: null,
  isLoading: true,
  error: null,
};

const roommateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMMATES:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ROOMMATES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roommates: action.payload,
      };
    case FETCH_ROOMMATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SELECT_ROOMMATE:
      return {
        ...state,
        selectedRoommate: action.payload,
      };
    default:
      return state;
  }
};

export default roommateReducer;
