import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import apartmentReducer from "../reducers/apartmentReducer";
import roommateReducer from "../reducers/roommateReducer";
import cityReducer from "../reducers/cityReducer";
import PersonaPAgeRoommate from "../reducers/PersonalePAgeRommate";

const rootReducer = combineReducers({
  apartment: apartmentReducer,
  roommate: roommateReducer,
  city: cityReducer,
  roommatePersonal: PersonaPAgeRoommate,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
