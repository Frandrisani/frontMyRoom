export const FETCH_APARTMENTS = "FETCH_APARTMENTS";
export const FETCH_APARTMENTS_SUCCESS = "FETCH_APARTMENTS_SUCCESS";
export const FETCH_APARTMENTS_FAILURE = "FETCH_APARTMENTS_FAILURE";

export const FETCH_ROOMMATES = "FETCH_ROOMMATES";
export const FETCH_ROOMMATES_SUCCESS = "FETCH_ROOMMATES_SUCCESS";
export const FETCH_ROOMMATES_FAILURE = "FETCH_ROOMMATES_FAILURE";

export const FETCH_ROOMMATE_FOR_PERSONAL_PAGE =
  "FETCH_ROOMMATE_FOR_PERSONAL_PAGE";
export const FETCH_ROOMMATE_FOR_PERSONAL_PAGE_SUCCESS =
  "FETCH_ROOMMATE_FOR_PERSONAL_PAGE_SUCCESS";
export const FETCH_ROOMMATE_FOR_PERSONAL_PAGE_FAILURE =
  "FETCH_ROOMMATE_FOR_PERSONAL_PAGE_FAILURE";

export const SELECT_APARTMENT = "SELECT_APARTMENT";
export const SELECT_ROOMMATE = "SELECT_ROOMMATE";

export const FETCH_CITY_REQUEST = "FETCH_CITY_REQUEST";
export const FETCH_CITY_SUCCESS = "FETCH_CITY_SUCCESS";
export const FETCH_CITY_FAILURE = "FETCH_CITY_FAILURE";

export const fetchApartments = () => async (dispatch) => {
  dispatch({ type: FETCH_APARTMENTS });
  try {
    const response = await fetch("API_URL_FOR_APARTMENTS");
    const data = await response.json();
    dispatch({ type: FETCH_APARTMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_APARTMENTS_FAILURE, payload: error.message });
  }
};

export const fetchRoommate = () => async (dispatch) => {
  dispatch({ type: FETCH_ROOMMATES });
  try {
    const response = await fetch("API_URL_FOR_ROOMMATES");
    const data = await response.json();
    dispatch({ type: FETCH_ROOMMATES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ROOMMATES_FAILURE, payload: error.message });
  }
};

export const fetchRoommateForPersonalPage = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ROOMMATE_FOR_PERSONAL_PAGE });
  try {
    const response = await fetch(`API_URL_FOR_ROOMMATE/${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_ROOMMATE_FOR_PERSONAL_PAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_ROOMMATE_FOR_PERSONAL_PAGE_FAILURE,
      payload: error.message,
    });
  }
};

export const selectApartment = (apartment) => ({
  type: SELECT_APARTMENT,
  payload: apartment,
});

export const selectRoommate = (roommate) => ({
  type: SELECT_ROOMMATE,
  payload: roommate,
});

export const fetchCity = (cityName) => async (dispatch) => {
  dispatch({ type: FETCH_CITY_REQUEST });
  try {
    const response = await fetch(`API_URL_FOR_CITY/${cityName}`);
    const data = await response.json();
    dispatch({ type: FETCH_CITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CITY_FAILURE, payload: error.message });
  }
};
