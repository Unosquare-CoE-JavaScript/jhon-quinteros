import { render, screen } from "@testing-library/react";
import { Options, OptionType } from "./../Options";

test("displays images for each scoop from the server", async () => {
  render(<Options optionType={OptionType.scoops} />);
  const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });

  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays images for each topping from the server", async () => {
  render(<Options optionType={OptionType.toppings} />);

  const toppingsImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map(
    (element: HTMLImageElement) => element.alt
  );
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
