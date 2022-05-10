import { render, screen } from "./../../../test-utils/testing-library-utils";
import { OrderConfirmation } from "./../../OrderConfirmation/OrderConfirmation";

test("verifiy that the Loading message dissapears whe the order loads", async () => {
  render(<OrderConfirmation setPhase={jest.fn()} />);
  const loadingMessage = screen.getByText("Loading");

  expect(loadingMessage).toBeInTheDocument();

  const orderSummary = await screen.findByRole("heading", {
    name: /your order number is/i,
  });
  expect(orderSummary).toHaveTextContent("1");
  const loadingRemoved = screen.queryByText("Loading");
  expect(loadingRemoved).not.toBeInTheDocument();
});
