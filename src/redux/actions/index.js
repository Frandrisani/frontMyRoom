// REGISTRAZIONE UTENTE
export const REGISTRAZIONE_UTENTE = "REGISTRAZIONE_UTENTE";
export const REGISTRAZIONE_UTENTE_SUCCESS = "REGISTRAZIONE_UTENTE_SUCCESS";
export const REGISTRAZIONE_UTENTE_FAILURE = "REGISTRAZIONE_UTENTE_FAILURE";
export const REGISTRAZIONE_UTENTE_SUCCESS_MESSAGE =
  "REGISTRAZIONE_UTENTE_SUCCESS_MESSAGE";
// REGISTRAZIONE UTENTE

// QUI MANDIAMO UNA POST PER REGISTRARE UN UTENTE
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
// QUI MANDIAMO UNA POST PER REGISTRARE UN UTENTE
