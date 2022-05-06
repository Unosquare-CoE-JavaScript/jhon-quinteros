import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has the correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveClass('button-color-red');
});

test('button turns blue when clicked', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  fireEvent.click(colorButton);
  expect(colorButton).toHaveClass('button-color-blue');
  expect(colorButton.textContent).toBe('Change to red');
})

test('initial conditions', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  expect(colorButton).toBeEnabled();
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('disable and then re-enable the button check/uncheck the checkbox', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to blue'});
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});