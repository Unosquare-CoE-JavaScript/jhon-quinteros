import React, { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "./ToppingOption.css";

type Props = {
  name: string;
  imagePath: string;
  updateItemCount: Function;
};

export function ToppingOption({ name, imagePath, updateItemCount }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    updateItemCount(name, e.target.checked ? 1 : 0);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="center-text">
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        className="img-size"
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" onChange={handleChange} label={name} />
      </Form.Group>
    </Col>
  );
}
