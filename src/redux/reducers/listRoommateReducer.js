import {
  LIST_ROOMMATE_REQUEST,
  LIST_ROOMMATE_SUCCESS,
  LIST_ROOMMATE_FAILURE,
} from "../actions/index.js";

const initialState = {
  loading: false,
  roommates: [],
  error: null,
};

const listRoommateReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ROOMMATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_ROOMMATE_SUCCESS:
      return {
        ...state,
        loading: false,
        roommates: action.payload,
      };
    case LIST_ROOMMATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listRoommateReducer;
