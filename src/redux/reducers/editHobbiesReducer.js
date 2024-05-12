import {
  EDIT_HOBBIES,
  EDIT_HOBBIES_SUCCESS,
  EDIT_HOBBIES_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  error: null,
  userInfo: null,
};

const editHobbiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_HOBBIES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_HOBBIES_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case EDIT_HOBBIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editHobbiesReducer;
