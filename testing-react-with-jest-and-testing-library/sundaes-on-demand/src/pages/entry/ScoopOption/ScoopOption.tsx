import React, { ChangeEvent } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import "./ScoopOption.css";

type Props = {
  name: string;
  imagePath: string;
  updateItemCount: Function;
};

export function ScoopOption({ name, imagePath, updateItemCount }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    updateItemCount(name, e.target.value);
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="center-text">
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        className="img-size"
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}></Col>
        <Form.Control
          type="number"
          defaultValue={0}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
    </Col>
  );
}
