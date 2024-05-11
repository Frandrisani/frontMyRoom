// REGISTRAZIONE UTENTE
export const REGISTRAZIONE_UTENTE = "REGISTRAZIONE_UTENTE";
export const REGISTRAZIONE_UTENTE_SUCCESS = "REGISTRAZIONE_UTENTE_SUCCESS";
export const REGISTRAZIONE_UTENTE_FAILURE = "REGISTRAZIONE_UTENTE_FAILURE";
export const REGISTRAZIONE_UTENTE_SUCCESS_MESSAGE =
  "REGISTRAZIONE_UTENTE_SUCCESS_MESSAGE";
// REGISTRAZIONE UTENTE

// LOGIN UTENTE
export const LOGIN_UTENTE = "LOGIN_UTENTE";
export const LOGIN_UTENTE_SUCCESS = "LOGIN_UTENTE_SUCCESS";
export const LOGIN_UTENTE_FAILURE = "LOGIN_UTENTE_FAILURE";
// LOGIN UTENTE

// INFORMAZIONI UTENTE
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS";
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE";
// INFORMAZIONI UTENTE

//* QUI MANDIAMO UNA POST PER REGISTRARE UN UTENTE
export const registerRequest = (userData) => async (dispatch) => {
  dispatch({ type: REGISTRAZIONE_UTENTE });
  try {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    dispatch({
      type: REGISTRAZIONE_UTENTE_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: REGISTRAZIONE_UTENTE_FAILURE,
      payload: error.message,
    });
  }
};
//! FINE QUI MANDIAMO UNA POST PER REGISTRARE UN UTENTE

//* QUI MANDIAMO UNA POST PER LOGGARE UN UTENTE
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_UTENTE });
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Errore durante il login");
    }
    const data = await response.json();
    sessionStorage.setItem("token", data.accessToken);
    dispatch({
      type: LOGIN_UTENTE_SUCCESS,
      payload: true,
    });
    return true;
  } catch (error) {
    console.error("Errore durante il login:", error);
    dispatch({
      type: LOGIN_UTENTE_FAILURE,
      payload: error.message,
    });
    return false;
  }
};
//! FINE QUI MANDIAMO UNA POST PER LOGGARE UN UTENTE

//* QUI MANDIAMO UNA GET PER OTTENERE LE INFORMAZIONI UTENTE
export const fetchUserInfo = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nel recupero delle informazioni dell'utente");
    }
    const userData = await response.json();
    console.log("Utente loggato:", userData);
    dispatch({
      type: FETCH_USER_INFO_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    console.error("Errore nel recupero delle informazioni dell'utente:", error);
    dispatch({
      type: FETCH_USER_INFO_FAILURE,
      payload: error.message,
    });
  }
};
//! FINE QUI MANDIAMO UNA GET PER OTTENERE LE INFORMAZIONI UTENTE
