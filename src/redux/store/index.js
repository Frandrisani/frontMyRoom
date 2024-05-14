import { configureStore, combineReducers } from "@reduxjs/toolkit";

import registrazioneReducer from "../reducers/registrazioneReducers";
import loginReducer from "../reducers/loginReducers";
import userInformationReducer from "../reducers/userInformationReducers";
import editBioReducers from "../reducers/editBioReducers";
import editHobbiesReducers from "../reducers/editHobbiesReducer";
import editPreferencesReducers from "../reducers/editPreferencesReducer";
import deleteUserReducers from "../reducers/deleteUserReducers";
import editAvatarReducers from "../reducers/editAvatarReducers";
import newRoomReducers from "../reducers/newRoomReducers";
import editImageRoom from "../reducers/editImageRoom";
import roomsByUserReducers from "../reducers/roomsByUserReducers";
import deleteRoomReducers from "../reducers/deleteRoomReducers";
import listRoomsReducers from "../reducers/listRoomsReducers";

const globalReducer = combineReducers({
  registration: registrazioneReducer,
  login: loginReducer,
  userInformation: userInformationReducer,
  editBio: editBioReducers,
  editHobbies: editHobbiesReducers,
  editPreferences: editPreferencesReducers,
  deleteuser: deleteUserReducers,
  uploadImage: editAvatarReducers,
  newRoom: newRoomReducers,
  editImageRoom: editImageRoom,
  roomsByUser: roomsByUserReducers,
  deleteRoom: deleteRoomReducers,
  listRooms: listRoomsReducers,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
