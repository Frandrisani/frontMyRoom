import {
  LOGIN_UTENTE,
  LOGIN_UTENTE_SUCCESS,
  LOGIN_UTENTE_FAILURE,
} from "../actions/index.js";

const initialState = {
  isAuthenticating: false,
  error: null,
};

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_UTENTE:
      return {
        ...state,
        isAuthenticating: true,
        error: null,
      };
    case LOGIN_UTENTE_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        error: null,
      };
    case LOGIN_UTENTE_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducers;
