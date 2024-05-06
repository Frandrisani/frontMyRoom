import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import apartmentReducer from "../reducers/apartmentReducer";
import roommateReducer from "../reducers/roommateReducer";
import cityReducer from "../reducers/cityReducer";

const rootReducer = combineReducers({
  apartment: apartmentReducer,
  roommate: roommateReducer,
  city: cityReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
