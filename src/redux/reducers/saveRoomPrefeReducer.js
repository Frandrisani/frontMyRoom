import {
  SAVE_ROOM_PREFE_REQUEST,
  SAVE_ROOM_PREFE_SUCCESS,
  SAVE_ROOM_PREFE_FAILURE,
} from "../actions/index";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const saveRoomPrefeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ROOM_PREFE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case SAVE_ROOM_PREFE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case SAVE_ROOM_PREFE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default saveRoomPrefeReducer;
