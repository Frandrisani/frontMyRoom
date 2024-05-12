import {
  EDIT_BIO,
  EDIT_BIO_SUCCESS,
  EDIT_BIO_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  error: null,
  userInfo: null,
};

const editBioReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_BIO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_BIO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, bio: action.payload.bio },
      };
    case EDIT_BIO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editBioReducer;
