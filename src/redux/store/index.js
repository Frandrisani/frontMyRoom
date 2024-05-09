import { configureStore, combineReducers } from "@reduxjs/toolkit";

import registrazioneReducer from "../reducers/registrazioneReducers";
import loginReducer from "../reducers/loginReducers";

const globalReducer = combineReducers({
  registration: registrazioneReducer,
  login: loginReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
