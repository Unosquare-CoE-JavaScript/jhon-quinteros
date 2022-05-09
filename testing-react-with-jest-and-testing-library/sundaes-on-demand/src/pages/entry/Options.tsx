import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScoopOption } from "./ScoopOption/ScoopOption";
import { ToppingOption } from "./ToppingOption/ToppingOption";
import { AlertBanner } from "../common/AlertBanner";
import Row from "react-bootstrap/Row";
import { PRICE_PER_ITEM } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

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
  const [orderDetails, updateItemCount] = useOrderDetails();

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
      updateItemCount={(itemName: string, newItemCount: string) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));
  if (error) {
    return <AlertBanner />;
  }
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  return (
    <>
      <h2>{title}</h2>
      <p>{PRICE_PER_ITEM[optionType]} each</p>
      <p>{`${title} total: ${orderDetails.total[optionType]}`}</p>
      <Row>{optionItems}</Row>
    </>
  );
}
