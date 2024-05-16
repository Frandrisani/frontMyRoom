import {
  SINGLE_ROOM_REQUEST,
  SINGLE_ROOM_SUCCESS,
  SINGLE_ROOM_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  error: null,
  room: null,
};

const singleRoomReducers = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SINGLE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        room: action.payload,
      };
    case SINGLE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default singleRoomReducers;
