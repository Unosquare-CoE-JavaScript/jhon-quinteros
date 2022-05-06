import React from 'react';
import { SummaryForm } from './../SummaryForm';
import { fireEvent, render, screen } from '@testing-library/react';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm/>);
  const termsCheckbox = screen.getByRole('checkbox', {name: 'I agree to Terms and Conditions'});
  const orderButton = screen.getByRole('button', {name: 'Confirm order'});

  expect(termsCheckbox).not.toBeChecked();
  expect(orderButton).toBeDisabled()

  fireEvent.click(termsCheckbox);

  expect(termsCheckbox).toBeChecked();
  expect(orderButton).toBeEnabled();
});