import {
  REMOVE_ROOM_PREFE_REQUEST,
  REMOVE_ROOM_PREFE_SUCCESS,
  REMOVE_ROOM_PREFE_FAILURE,
} from "../actions/";

const initialState = {
  loading: false,
  error: null,
  removed: false,
};

const deleteRoomPrefeReducers = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ROOM_PREFE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        removed: false,
      };
    case REMOVE_ROOM_PREFE_SUCCESS:
      return {
        ...state,
        loading: false,
        removed: action.payload,
      };
    case REMOVE_ROOM_PREFE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default deleteRoomPrefeReducers;
