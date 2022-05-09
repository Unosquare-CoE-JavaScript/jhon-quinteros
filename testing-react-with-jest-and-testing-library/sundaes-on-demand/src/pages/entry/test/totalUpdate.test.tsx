import { render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { Options, OptionType } from "./../Options";
import { OrderDetailsProvider } from "./../../../contexts/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.scoops} />);
  const scoopSubtotal = screen.getByText(/Scoops total: \$/i);

  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopSubtotal).toHaveTextContent("2.00");

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopSubtotal).toHaveTextContent("6.00");
});
