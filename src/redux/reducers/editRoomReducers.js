import {
  EDIT_ROOM_REQUEST,
  EDIT_ROOM_SUCCESS,
  EDIT_ROOM_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  error: null,
  roomInfo: null,
};

const editRoomReducers = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EDIT_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        roomInfo: action.payload,
      };
    case EDIT_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editRoomReducers;
