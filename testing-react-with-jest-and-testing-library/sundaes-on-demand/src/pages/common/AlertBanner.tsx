import React from "react";
import Alert from "react-bootstrap/Alert";

type Props = {
  message?: string;
  variant?: string;
};

export function AlertBanner({ message, variant }: Props) {
  const alertMessage =
    message || "An unexpected erro ocurred. Please try again later.";
  const alertVariant = variant || "danger";
  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
}
