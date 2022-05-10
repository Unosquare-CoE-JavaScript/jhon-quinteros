import React from "react";
import Button from "react-bootstrap/Button";
import { Options, OptionType } from "../Options";
import { useOrderDetails } from "../../../contexts/OrderDetails";

type Props = {
  setPhase: Function;
};
export function OrderEntry({ setPhase }: Props) {
  const [orderDetails] = useOrderDetails();
  const orderDisabled = orderDetails.total.scoops === "$0.00";
  return (
    <div>
      <Options optionType={OptionType.scoops} />
      <Options optionType={OptionType.toppings} />
      <h2>{`Grand total: ${orderDetails.total.grandTotal}`}</h2>
      <Button disabled={orderDisabled} onClick={() => setPhase("ConfirmPhase")}>
        Order Sundae!
      </Button>
    </div>
  );
}
