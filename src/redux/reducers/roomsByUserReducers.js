import { ROOM_USER_FAILURE, ROOM_USER_SUCCESS } from "../actions/index.js";

const initialState = {
  roomInfo: [],
  error: null,
  success: false,
};

const roomsByUserReducers = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_USER_SUCCESS:
      return {
        ...state,
        roomInfo: action.payload,
        error: null,
        success: true,
      };
    case ROOM_USER_FAILURE:
      return {
        ...state,
        roomInfo: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roomsByUserReducers;
