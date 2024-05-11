import {
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
} from "../actions/index.js";

const initialState = {
  userInfo: false,
  error: null,
  success: false,
};

const userInformationReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        error: null,
        success: true,
      };
    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        userInfo: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userInformationReducers;
