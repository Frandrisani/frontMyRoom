import { configureStore, combineReducers } from "@reduxjs/toolkit";

import registrazioneReducer from "../reducers/registrazioneReducers";
import loginReducer from "../reducers/loginReducers";
import userInformationReducer from "../reducers/userInformationReducers";

const globalReducer = combineReducers({
  registration: registrazioneReducer,
  login: loginReducer,
  userInformation: userInformationReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
