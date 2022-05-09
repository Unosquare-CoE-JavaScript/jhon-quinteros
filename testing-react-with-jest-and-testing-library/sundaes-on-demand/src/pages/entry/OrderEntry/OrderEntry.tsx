import React from "react";
import { Options, OptionType } from "../Options";
import { useOrderDetails } from "../../../contexts/OrderDetails";

export function OrderEntry() {
  const [orderDetils] = useOrderDetails();

  return (
    <div>
      <Options optionType={OptionType.scoops} />
      <Options optionType={OptionType.toppings} />
      <h2>{`Grand total: ${orderDetils.total.grandTotal}`}</h2>
    </div>
  );
}
