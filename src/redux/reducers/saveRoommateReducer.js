import {
  SAVE_ROOMMATE_REQUEST,
  SAVE_ROOMMATE_SUCCESS,
  SAVE_ROOMMATE_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const saveRoommateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ROOMMATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVE_ROOMMATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SAVE_ROOMMATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveRoommateReducer;
