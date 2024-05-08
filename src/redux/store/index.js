import { configureStore, combineReducers } from "@reduxjs/toolkit";

import registrazioneReducer from "../reducers/registrazioneReducers";

const globalReducer = combineReducers({
  registration: registrazioneReducer,
});

const store = configureStore({
  reducer: globalReducer,
});

export default store;
