import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type Props = {
  setPhase: Function;
};
export function OrderConfirmation({ setPhase }: Props) {
  const [, , resetCount] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {});
  }, []);

  function onClick() {
    resetCount();
    setPhase("OrderPhase");
  }
  if (orderNumber) {
    return (
      <Row>
        <Col>
          <h1>Thank you!</h1>
          <h2>Your order number is {orderNumber}</h2>
          <p style={{ fontSize: "25%" }}>
            as per our terms and conditions, nothing will happen now
          </p>
          <Button variant="primary" onClick={onClick}>
            Create new order
          </Button>
        </Col>
      </Row>
    );
  } else {
    return <div>Loading</div>;
  }
}
