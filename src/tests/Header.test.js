import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import INITIAL_EXAMPLE from './helpers/initialExample';

test('Testa de a despesa e o e-mail são redenrizados corretamente', () => {
  renderWithRouterAndRedux(<Header />, { initialState: INITIAL_EXAMPLE });
  const emailField = screen.getByTestId('email-field');
  expect(emailField).toBeInTheDocument('bia@trybe.com');
});
