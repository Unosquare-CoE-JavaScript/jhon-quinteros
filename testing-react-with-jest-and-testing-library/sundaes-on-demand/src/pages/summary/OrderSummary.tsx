import React from "react";
import { SummaryForm } from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";

type Props = {
  setPhase: Function;
};
export function OrderSummary({ setPhase }: Props) {
  const [orderDetils] = useOrderDetails();
  const scoopArray: any = Array.from(orderDetils.scoops.entries());
  const scoopList = scoopArray.map(([key, value]: [string, string]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray: any = Array.from(orderDetils.toppings.keys());
  const toppingsList = toppingsArray.map((key: string) => (
    <li key={key}>{key}</li>
  ));
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetils.total.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetils.total.toppings}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm setPhase={setPhase} />
    </div>
  );
}
