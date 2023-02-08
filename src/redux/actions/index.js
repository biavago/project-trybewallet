// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const fetchAPI = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currency) => dispatch(saveCurrencies(currency)));
};
