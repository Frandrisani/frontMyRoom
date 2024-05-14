import { ROOM_SUCCESS, ROOM_FAILURE } from "../actions/index.js";

const initialState = {
  roomInfo: [],
  error: null,
  success: false,
};

const listRoomsReducers = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_SUCCESS:
      return {
        ...state,
        roomInfo: action.payload,
        error: null,
        success: true,
      };
    case ROOM_FAILURE:
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

export default listRoomsReducers;
