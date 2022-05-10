import React from "react";
import { SummaryForm } from "./../SummaryForm";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("checkbox is unchecked by default", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole("button", { name: /confirm order/i });

  expect(termsCheckbox).not.toBeChecked();
  expect(orderButton).toBeDisabled();

  await user.click(termsCheckbox);
  expect(termsCheckbox).toBeChecked();
  expect(orderButton).toBeEnabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  expect(nullPopover).not.toBeInTheDocument();

  await user.hover(termsAndConditions);
  const termsPopover = screen.getByText(
    /no ice cream will actually be delivered/i
  );

  expect(termsPopover).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
