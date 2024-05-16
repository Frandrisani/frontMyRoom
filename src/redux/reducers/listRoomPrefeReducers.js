import {
  LIST_ROOM_PREFE_REQUEST,
  LIST_ROOM_PREFE_SUCCESS,
  LIST_ROOM_PREFE_FAILURE,
} from "../actions/";

const initialState = {
  loading: false,
  error: null,
  rooms: [],
};

const listRoomPrefeReducers = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ROOM_PREFE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LIST_ROOM_PREFE_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case LIST_ROOM_PREFE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listRoomPrefeReducers;
