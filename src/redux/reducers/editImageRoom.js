import {
  UPLOAD_IMAGE_ROOM_REQUEST,
  UPLOAD_IMAGE_ROOM_SUCCESS,
  UPLOAD_IMAGE_ROOM_FAILURE,
} from "../actions/";

const initialState = {
  imageUploadLoading: false,
  imageUploadError: null,
};

const editImageRoom = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_ROOM_REQUEST:
      return {
        ...state,
        imageUploadLoading: true,
        imageUploadError: null,
      };

    case UPLOAD_IMAGE_ROOM_SUCCESS:
      return {
        ...state,
        imageUploadLoading: false,
        userInfo: {
          ...state.userInfo,
          avatar: action.payload.avatar,
        },
      };
    case UPLOAD_IMAGE_ROOM_FAILURE:
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadError: action.payload,
      };

    default:
      return state;
  }
};

export default editImageRoom;
