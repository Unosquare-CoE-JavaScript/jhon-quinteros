import React from "react";
import { Options, OptionType } from "../Options";

export function OrderEntry() {
  return (
    <div>
      <Options optionType={OptionType.scoops} />
      <Options optionType={OptionType.toppings} />
    </div>
  );
}
