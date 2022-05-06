import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, {replaceCamelWithSpaces} from './App';

test('button has the correct initial color', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue' });
  expect(colorButton).toHaveClass('button-color-red');
});

test('button turns blue when clicked', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue'});
  fireEvent.click(colorButton);
  expect(colorButton).toHaveClass('button-color-blue');
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
})

test('initial conditions', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue'});
  expect(colorButton).toBeEnabled();
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('disable and then re-enable the button check/uncheck the checkbox', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue'});
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

test('disable button change color to gray then to red', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue'});
  const disableCheckbox = screen.getByRole('checkbox', { name: 'Disable button'});

  expect(colorButton).toBeEnabled();
  expect(disableCheckbox).not.toBeChecked();

  fireEvent.click(disableCheckbox);

  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveClass('button-color-gray');
  expect(disableCheckbox).toBeChecked();

  fireEvent.click(disableCheckbox);

  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveClass('button-color-red');
  expect(disableCheckbox).not.toBeChecked();
});

test('disable button change color to gray then to blue', () => {
  render(<App/>);
  const colorButton = screen.getByRole('button', { name: 'Change to Mid Night Blue'});
  const disableCheckbox = screen.getByRole('checkbox', { name: 'Disable button'});

  expect(colorButton).toBeEnabled();
  expect(disableCheckbox).not.toBeChecked();

  fireEvent.click(colorButton);
  fireEvent.click(disableCheckbox);

  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveClass('button-color-gray');
  expect(disableCheckbox).toBeChecked();

  fireEvent.click(disableCheckbox);

  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveClass('button-color-blue');
});

describe('spaces before capital letters', () => {

  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('red')).toBe('red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });

});