import { render, screen } from "./../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { Options, OptionType } from "./../Options";
import { OrderEntry } from "./../OrderEntry/OrderEntry";

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

test("update topping subtotal when topping is selected", async () => {
  const user = userEvent.setup();

  render(<Options optionType={OptionType.toppings} />);
  const toppingSubtotal = screen.getByText(/Toppings total: \$/i);

  expect(toppingSubtotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  await user.click(cherriesInput);

  expect(toppingSubtotal).toHaveTextContent("1.50");

  await user.click(hotFudgeInput);

  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(cherriesInput);

  expect(toppingSubtotal).toHaveTextContent("1.50");
  expect(cherriesInput).not.toBeChecked();
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const scoopOption = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(scoopOption);
    await user.type(scoopOption, "2");
    expect(grandTotal).toHaveTextContent("4.00");
  });

  test("grand total updates properly if topping is added first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const toppingOption = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(toppingOption);
    expect(grandTotal).toHaveTextContent("1.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const scoopOption = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(scoopOption);
    await user.type(scoopOption, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    await user.clear(scoopOption);
    await user.type(scoopOption, "1");

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
