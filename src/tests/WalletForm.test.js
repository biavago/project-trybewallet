import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

const userCreateExpense = async () => {
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');

  userEvent.type(valueInput, '5');
  userEvent.type(descriptionInput, 'bolo');
  userEvent.selectOptions(methodInput, 'Dinheiro');
  await waitFor(() => userEvent.selectOptions(currencyInput, 'USD'));
  userEvent.selectOptions(tagInput, 'Alimentação');
};

test('Testa todos os inputs', async () => {
  renderWithRouterAndRedux(<WalletForm />);

  await userCreateExpense();
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const currencyInput = screen.getByTestId('currency-input');
  const methodInput = screen.getByTestId('method-input');
  const tagInput = screen.getByTestId('tag-input');
  const addButton = screen.getByRole('button');
  expect(valueInput).toHaveValue(5);
  expect(descriptionInput).toHaveValue('bolo');
  expect(currencyInput).toHaveValue('USD');
  expect(methodInput).toHaveValue('Dinheiro');
  expect(tagInput).toHaveValue('Alimentação');
  expect(addButton).toBeInTheDocument();
});
