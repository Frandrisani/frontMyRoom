import {
  EDIT_PREFERENCES,
  EDIT_PREFERENCES_SUCCESS,
  EDIT_PREFERENCES_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  error: null,
  userInfo: null,
};

const editPreferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PREFERENCES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case EDIT_PREFERENCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editPreferencesReducer;
