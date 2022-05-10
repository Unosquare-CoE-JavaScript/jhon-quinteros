import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);

  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  //const orderButton = screen.getByRole("button", { name: /order/i });

  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "2");

  //user.click(orderButton);
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $0.00",
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();

  const confirmationButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmationButton);

  const thankyouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankyouHeader).toBeInTheDocument();

  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);

  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
});
