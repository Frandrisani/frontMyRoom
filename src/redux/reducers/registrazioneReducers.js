import {
  REGISTRAZIONE_UTENTE,
  REGISTRAZIONE_UTENTE_SUCCESS,
  REGISTRAZIONE_UTENTE_FAILURE,
} from "../actions/index.js";

const initialState = {
  isRegistering: false,
  error: null,
  success: false, // Aggiungi uno stato per indicare il successo della registrazione
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRAZIONE_UTENTE:
      return {
        ...state,
        isRegistering: true,
        error: null,
        success: false, // Resetta lo stato di successo quando inizia la registrazione
      };
    case REGISTRAZIONE_UTENTE_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        error: null,
        success: true, // Imposta lo stato di successo a true dopo una registrazione riuscita
      };
    case REGISTRAZIONE_UTENTE_FAILURE:
      return {
        ...state,
        isRegistering: false,
        error: action.payload,
        success: false, // Assicurati che lo stato di successo sia falso in caso di errore
      };
    default:
      return state;
  }
};

export default registrationReducer;
