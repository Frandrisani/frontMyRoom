import {
  FETCH_ROOMMATE,
  FETCH_ROOMMATE_SUCCESS,
  FETCH_ROOMMATE_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  roommate: null,
  isLoading: false,
  error: null,
};

const PersonaPAgeRoommate = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMMATE:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_ROOMMATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        roommate: action.payload,
      };
    case FETCH_ROOMMATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default PersonaPAgeRoommate;
