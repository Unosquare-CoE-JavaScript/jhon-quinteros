import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScoopOption } from "./ScoopOption/ScoopOption";
import { ToppingOption } from "./ToppingOption/ToppingOption";
import { AlertBanner } from "../common/AlertBanner";
import Row from "react-bootstrap/Row";

export enum OptionType {
  scoops = "scoops",
  toppings = "toppings",
}

type Props = {
  optionType: OptionType;
};

export function Options({ optionType }: Props) {
  const [items, setItems] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [optionType]);

  const ItemComponent: any =
    optionType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map((item: any) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  if (error) {
    return <AlertBanner />;
  }
  return <Row>{optionItems}</Row>;
}
