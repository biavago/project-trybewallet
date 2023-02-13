import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailID = 'email-input';
const passwordID = 'password-input';
const emailValue = 'bia@trybe.com';
const passwordValue = '123456';

test('Testa os campos de e-mail e senha', () => {
  renderWithRouterAndRedux(<App />);

  const emailInput = screen.getByTestId(emailID);
  const passwordInput = screen.getByTestId(passwordID);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  userEvent.type(emailInput, 'bia');
  expect(emailInput.value).toBe('bia');
  userEvent.type(passwordInput, '123456');
  expect(passwordInput).toHaveValue('123456');
});

test('Testa o botão de Entrar', () => {
  renderWithRouterAndRedux(<App />);

  const enterButton = screen.getByRole('button');
  expect(enterButton).toBeDisabled();

  const emailInput = screen.getByTestId(emailID);
  userEvent.type(emailInput, emailValue);
  const passwordInput = screen.getByTestId(passwordID);
  userEvent.type(passwordInput, passwordValue);
  expect(enterButton).toBeEnabled();
});

test('Testa se ao clickar em entrar você é redirecionado pra /carteira e o email vai para estado global', () => {
  const { history, store } = renderWithRouterAndRedux(<App />);

  const button = screen.getByRole('button');

  const emailInput = screen.getByTestId(emailID);
  const passwordInput = screen.getByTestId(passwordID);

  userEvent.type(emailInput, emailValue);
  userEvent.type(passwordInput, passwordValue);
  userEvent.click(button);
  expect(history.location.pathname).toBe('/carteira');
  const state = store.getState();
  expect(state.user.email).toBe('bia@trybe.com');
});
