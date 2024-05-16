import {
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILURE,
} from "../actions/index.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const deleteRoomReducers = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ROOM_REQUEST:
      return { ...state, loading: true };
    case DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case DELETE_ROOM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default deleteRoomReducers;
