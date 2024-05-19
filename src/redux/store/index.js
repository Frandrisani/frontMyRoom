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
import editRoomReducers from "../reducers/editRoomReducers";
import singleRoomReducers from "../reducers/singleRoomReducers";
import saveRoomPrefeReducer from "../reducers/saveRoomPrefeReducer";
import deleteRoomPrefeReducers from "../reducers/deleteRoomPrefeReducers";
import listRoomPrefeReducers from "../reducers/listRoomPrefeReducers";
import saveRoommateReducer from "../reducers/saveRoommateReducer";
import listRoommateReducer from "../reducers/listRoommateReducer";
import deleteRoommateReducer from "../reducers/deleteRoommateReducer";
import { UserByEmailReducer } from "../reducers/UserByEmailReducer";

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
  editRoom: editRoomReducers,
  singleRoom: singleRoomReducers,
  saveRoomPrefe: saveRoomPrefeReducer,
  deleteRoomPrefe: deleteRoomPrefeReducers,
  listRoomPrefe: listRoomPrefeReducers,
  saveRoommate: saveRoommateReducer,
  listRoommate: listRoommateReducer,
  deleteRoommate: deleteRoommateReducer,
  userByEmail: UserByEmailReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
