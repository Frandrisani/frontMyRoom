import {
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAILURE,
} from "../actions/index.js";

const initialState = {
  isRegistering: false,
  error: null,
  success: false,
};

const newRoomReducers = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return {
        ...state,
        isRegistering: true,
        error: null,
        success: false,
      };
    case NEW_ROOM_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        error: null,
        success: true,
      };
    case NEW_ROOM_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default newRoomReducers;
