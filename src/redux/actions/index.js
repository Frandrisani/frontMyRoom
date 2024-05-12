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

// EDIT BIO
export const EDIT_BIO = "EDIT_BIO";
export const EDIT_BIO_SUCCESS = "EDIT_BIO_SUCCESS";
export const EDIT_BIO_FAILURE = "EDIT_BIO_FAILURE";
// EDIT BIO

// EDIT HOBBIES
export const EDIT_HOBBIES = "EDIT_HOBBIES";
export const EDIT_HOBBIES_SUCCESS = "EDIT_HOBBIES_SUCCESS";
export const EDIT_HOBBIES_FAILURE = "EDIT_HOBBIES_FAILURE";
// EDIT HOBBIES

// EDIT PREFERENCES
export const EDIT_PREFERENCES = "EDIT_PREFERENCES";
export const EDIT_PREFERENCES_SUCCESS = "EDIT_PREFERENCES_SUCCESS";
export const EDIT_PREFERENCES_FAILURE = "EDIT_PREFERENCES_FAILURE";
// EDIT PREFERENCES

// DELETE USER
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
// DELETE USER

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
    console.log("Token:", data.accessToken);
    console.log("UserId:", data.id);
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
    sessionStorage.setItem("userId", userData.id);
    console.log("Id utente loggato:", userData.id);
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

//* QUI EDITIAMO LA BIO DELL'USER
export const editBio = (bio) => async (dispatch) => {
  console.log("bio:", bio);
  dispatch({ type: EDIT_BIO });
  try {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const response = await fetch(`http://localhost:3001/users/${userId}/bio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio }),
    });
    console.log("risposta edit bio:", response);
    if (!response.ok) {
      throw new Error("Errore durante la modifica della bio");
    }
    console.log("nuova bio:", response.json());
    const data = await response.json();
    dispatch({ type: EDIT_BIO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_BIO_FAILURE, payload: error.message });
  }
};
//! FINE QUI EDITIAMO LA BIO DELL'USER

//* QUI EDITIAMO GLI HOBBIES DELL'USER
export const editHobbies = (hobbies) => async (dispatch) => {
  dispatch({ type: EDIT_HOBBIES });
  try {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const response = await fetch(
      `http://localhost:3001/users/${userId}/hobbies`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hobbies }),
      }
    );
    if (!response.ok) {
      throw new Error("Errore durante la modifica degli hobby");
    }
    const data = await response.json();
    dispatch({ type: EDIT_HOBBIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_HOBBIES_FAILURE, payload: error.message });
  }
};
//! FINE QUI EDITIAMO GLI HOBBIES DELL'USER

//* QUI EDITIAMO LE PREFERENZE SUL COINQUILINO DELL'USER
export const editPreferences = (preferences) => async (dispatch) => {
  dispatch({ type: EDIT_PREFERENCES });
  try {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const response = await fetch(
      `http://localhost:3001/users/${userId}/preferences`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      }
    );
    if (!response.ok) {
      throw new Error("Errore durante la modifica delle preferenze");
    }
    const data = await response.json();
    dispatch({ type: EDIT_PREFERENCES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_PREFERENCES_FAILURE, payload: error.message });
  }
};
//*! FINE QUI EDITIAMO LE PREFERENZE SUL COINQUILINO DELL'USER

//* QUI CANCELLIAMO UN USER
export const deleteUser = () => async (dispatch) => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  dispatch({ type: DELETE_USER_REQUEST });
  try {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};
//! FINE QUI CANCELLIAMO UN USER
