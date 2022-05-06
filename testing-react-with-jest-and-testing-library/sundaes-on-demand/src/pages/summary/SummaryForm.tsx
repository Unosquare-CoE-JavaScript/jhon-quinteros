import React, { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SummaryForm.css";

export function SummaryForm(props: any) {
  const [checked, setChecked] = useState(false);

  function onClickCheck(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          onChange={onClickCheck}
          label={
            <span>
              I agree to
              <span className="terms-color"> Terms and Conditions</span>
            </span>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm order
      </Button>
    </Form>
  );
}
