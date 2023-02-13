import {
  ADD_EXPENSES, DELETE_EXPENSES,
  EDIT_EXPENSES, SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_CURRENCIES:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      id: state.id + 1,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSES:
    return {

    };
  default:
    return state;
  }
};

export default walletReducer;
