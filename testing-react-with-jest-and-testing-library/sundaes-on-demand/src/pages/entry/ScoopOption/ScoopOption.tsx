import React from "react";
import Col from "react-bootstrap/Col";
import "./ScoopOption.css";

type Props = {
  name: string;
  imagePath: string;
};

export function ScoopOption({ name, imagePath }: Props) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="center-text">
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        className="img-size"
      />
    </Col>
  );
}
