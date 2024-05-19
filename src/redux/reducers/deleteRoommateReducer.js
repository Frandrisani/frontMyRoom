import {
  REMOVE_ROOMMATE_REQUEST,
  REMOVE_ROOMMATE_SUCCESS,
  REMOVE_ROOMMATE_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const deleteRoommateReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ROOMMATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_ROOMMATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REMOVE_ROOMMATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deleteRoommateReducer;
