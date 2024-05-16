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

// EDIT IMG
export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
// EDIT IMG

// DELETE USER
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
// DELETE USER

// SALVA STANZA NEI PREFERITI
export const SAVE_ROOM_PREFE_REQUEST = "SAVE_ROOM_PREFE_REQUEST";
export const SAVE_ROOM_PREFE_SUCCESS = "SAVE_ROOM_PREFE_SUCCESS";
export const SAVE_ROOM_PREFE_FAILURE = "SAVE_ROOM_PREFE_FAILURE";
// SALVA STANZA NEI PREFERITI

// LISTA STANZE NEI PREFERITI
export const LIST_ROOM_PREFE_REQUEST = "LIST_ROOM_PREFE_REQUEST";
export const LIST_ROOM_PREFE_SUCCESS = "LIST_ROOM_PREFE_SUCCESS";
export const LIST_ROOM_PREFE_FAILURE = "LIST_ROOM_PREFE_FAILURE";
// LISTA STANZE NEI PREFERITI

// RIMUOVI STANZA NEI PREFERITI
export const REMOVE_ROOM_PREFE_REQUEST = "REMOVE_ROOM_PREFE_REQUEST";
export const REMOVE_ROOM_PREFE_SUCCESS = "REMOVE_ROOM_PREFE_SUCCESS";
export const REMOVE_ROOM_PREFE_FAILURE = "REMOVE_ROOM_PREFE_FAILURE";
// RIMUOVI STANZA NEI PREFERITI

// NEW ROOM
export const NEW_ROOM_REQUEST = "NEW_ROOM_REQUEST";
export const NEW_ROOM_SUCCESS = "NEW_ROOM_SUCCESS";
export const NEW_ROOM_FAILURE = "NEW_ROOM_FAILURE";
// NEW ROOM

// EDIT ROOM
export const EDIT_ROOM_REQUEST = "EDIT_ROOM_REQUEST";
export const EDIT_ROOM_SUCCESS = "EDIT_ROOM_SUCCESS";
export const EDIT_ROOM_FAILURE = "EDIT_ROOM_FAILURE";
// EDIT ROOM

// SINGLE ROOM
export const SINGLE_ROOM_REQUEST = "SINGLE_ROOM_REQUEST";
export const SINGLE_ROOM_SUCCESS = "SINGLE_ROOM_SUCCESS";
export const SINGLE_ROOM_FAILURE = "SINGLE_ROOM_FAILURE";
// SINGLE ROOM

// ROOM LIST
export const ROOM_SUCCESS = "ROOM_SUCCESS";
export const ROOM_FAILURE = "ROOM_FAILURE";
// ROOM LIST

// ROOM LIST USER
export const ROOM_USER_SUCCESS = "ROOM_USER_SUCCESS";
export const ROOM_USER_FAILURE = "ROOM_USER_FAILURE";
// ROOM LIST USER

// EDIT IMG ROOM
export const UPLOAD_IMAGE_ROOM_REQUEST = "UPLOAD_IMAGE_ROOM_REQUEST";
export const UPLOAD_IMAGE_ROOM_SUCCESS = "UPLOAD_IMAGE_ROOM_SUCCESS";
export const UPLOAD_IMAGE_ROOM_FAILURE = "UPLOAD_IMAGE_ROOM_FAILURE";
// EDIT IMG ROOM

// DELETE USER
export const DELETE_ROOM_REQUEST = "DELETE_ROOM_REQUEST";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAILURE = "DELETE_ROOM_FAILURE";
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

//* QUI EDITIAMO L'IMMAGINE PROFILO
export const uploadImage = (image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  try {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("avatar", image);

    const response = await fetch(`http://localhost:3001/users/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading image");
    }

    const data = await response.json();
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_FAILURE, payload: error.message });
  }
};
//! FINE QUI EDITIAMO L'IMMAGINE PROFILO

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
    sessionStorage.clear();
    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
  }
};
//! FINE QUI CANCELLIAMO UN USER

//* QUI SALVIAMO UNA STANZA NEI RPEFERITI
export const saveRoomInFavorites = (roomId) => async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  dispatch({ type: SAVE_ROOM_PREFE_REQUEST });
  try {
    const response = await fetch(
      `http://localhost:3001/favorite-rooms/${userId}/${roomId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    dispatch({
      type: SAVE_ROOM_PREFE_SUCCESS,
      payload: true,
    });
    return true;
  } catch (error) {
    console.error("Errore durante il salvataggio:", error);
    dispatch({
      type: SAVE_ROOM_PREFE_FAILURE,
      payload: error.message,
    });
    return false;
  }
};
//! FINE QUI SALVIAMO UNA STANZA NEI RPEFERITI

//* QUI ABBIAMO LA LISTA DELLE STANZE NEI PREFERITI
export const listRoomInFavorites = () => async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  dispatch({ type: LIST_ROOM_PREFE_REQUEST });
  try {
    const response = await fetch(
      `http://localhost:3001/favorite-rooms/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    const room = await response.json();
    dispatch({
      type: LIST_ROOM_PREFE_SUCCESS,
      payload: room,
    });
    return true;
  } catch (error) {
    console.error("Errore durante il salvataggio:", error);
    dispatch({
      type: LIST_ROOM_PREFE_FAILURE,
      payload: error.message,
    });
    return false;
  }
};
//! FINE QUI ABBIAMO LA LISTA DELLE STANZE NEI PREFERITI

//* QUI ELIMINIAMO UNA STANZA NEI RPEFERITI
export const deleteRoomInFavorites = (roomId) => async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  dispatch({ type: REMOVE_ROOM_PREFE_REQUEST });
  try {
    const response = await fetch(
      `http://localhost:3001/favorite-rooms/${userId}/${roomId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Errore durante il salvataggio");
    }
    dispatch({
      type: REMOVE_ROOM_PREFE_SUCCESS,
      payload: true,
    });
    return console.log("eliminato");
  } catch (error) {
    console.error("Errore durante il salvataggio:", error);
    dispatch({
      type: REMOVE_ROOM_PREFE_FAILURE,
      payload: error.message,
    });
    return false;
  }
};
//! FINE QUI ELIMINIAMO UNA STANZA NEI RPEFERITI

// --- ANNUNCI ----------------- ANNUNCI ------------------- ANNUNCI ------------------ ANNUNCI -----------------

//* QUI MANDIAMO UNA POST PER REGISTRARE UN NUOVO ANNUNCIO
export const newRoom = (roomData) => async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  dispatch({ type: NEW_ROOM_REQUEST });
  try {
    const response = await fetch(
      `http://localhost:3001/rooms/create/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(roomData),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const room = await response.json();
    dispatch({ type: NEW_ROOM_SUCCESS, payload: room });
    return room.id;
  } catch (error) {
    dispatch({ type: NEW_ROOM_FAILURE, payload: error.message });
  }
};
//! FINE QUI MANDIAMO UNA POST PER REGISTRARE UN NUOVO ANNUNCIO

//* QUI MANDIAMO UNA PUT PER MODIFICARE UN ANNUNCIO
export const editRoom = (id, roomData) => async (dispatch) => {
  dispatch({ type: EDIT_ROOM_REQUEST });
  try {
    const response = await fetch(`http://localhost:3001/rooms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(roomData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const room = await response.json();
    dispatch({ type: EDIT_ROOM_SUCCESS, payload: room });
  } catch (error) {
    dispatch({ type: EDIT_ROOM_FAILURE, payload: error.message });
  }
};
//! FINE QUI MANDIAMO UNA PUT PER MODIFICARE UN ANNUNCIO

//* QUI MANDIAMO UNA GET PER OTTENERE LE ROOMS BY UTENTE
export const fetchRoomByUser = () => async (dispatch) => {
  const userId = sessionStorage.getItem("userId");
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/rooms/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nel recupero delle informazioni delle stanze");
    }
    const userData = await response.json();
    console.log("stanze: ", userData);
    dispatch({
      type: ROOM_USER_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    console.error("Errore nel recupero delle informazioni dell'utente:", error);
    dispatch({
      type: ROOM_USER_FAILURE,
      payload: error.message,
    });
  }
};
//! FINE QUI MANDIAMO UNA GET PER OTTENERE LE ROOMS BY UTENTE

//* QUI MANDIAMO UNA GET PER OTTENERE UNA STANZA SPECIFICA
export const fetchSingleRoom = (id) => async (dispatch) => {
  dispatch({ type: SINGLE_ROOM_REQUEST });
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/rooms/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nel recupero delle informazioni della stanza");
    }
    const roomData = await response.json();
    dispatch({
      type: SINGLE_ROOM_SUCCESS,
      payload: roomData,
    });
  } catch (error) {
    console.error(
      "Errore nel recupero delle informazioni della stanza:",
      error
    );
    dispatch({
      type: SINGLE_ROOM_FAILURE,
      payload: error.message,
    });
  }
};
//! FINE QUI MANDIAMO UNA GET PER OTTENERE UNA STANZA SPECIFICA

//* QUI EDITIAMO L'IMMAGINE DI UNA STANZA
export const uploadImageRoom = (roomId, image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE_ROOM_REQUEST });
  try {
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(
      `http://localhost:3001/rooms/${roomId}/image`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error uploading image");
    }
    const data = await response.json();
    dispatch({ type: UPLOAD_IMAGE_ROOM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_ROOM_FAILURE, payload: error.message });
  }
};
//! FINE QUI EDITIAMO L'IMMAGINE DI UNA STANZA

//* QUI CANCELLIAMO UN ANNUNCIO
export const deleteRoom = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("token");
  dispatch({ type: DELETE_ROOM_REQUEST });
  try {
    const response = await fetch(`http://localhost:3001/rooms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete room");
    }
    dispatch({ type: DELETE_ROOM_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ROOM_FAILURE, payload: error.message });
  }
};
//! FINE QUI CANCELLIAMO UN ANNUNCIO

// --- ANNUNCI HOMEPAGE ----------------- ANNUNCI HOMEPAGE ------------------- ANNUNCI HOMEPAGE ------------------ ANNUNCI HOMEPAGE -----------------

//* QUI MANDIAMO UNA GET PER OTTENERE LE ROOMS IN HOMEPAGE
export const fetchRoom = (city) => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/rooms?city=${city}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nel recupero delle informazioni delle stanze");
    }
    const userData = await response.json();
    console.log("stanze: ", userData);
    dispatch({
      type: ROOM_SUCCESS,
      payload: userData,
    });
  } catch (error) {
    console.error(
      "Errore nel recupero delle informazioni  delle stanze:",
      error
    );
    dispatch({
      type: ROOM_FAILURE,
      payload: error.message,
    });
  }
};
//! FINE QUI MANDIAMO UNA GET PER OTTENERE LE ROOMS IN HOMEPAGE
