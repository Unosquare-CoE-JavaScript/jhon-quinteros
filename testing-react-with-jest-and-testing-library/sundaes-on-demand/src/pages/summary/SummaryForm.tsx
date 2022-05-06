import React, { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "./SummaryForm.css";

export function SummaryForm(props: any) {
  const [isChecked, setChecked] = useState(false);

  function onClickCheck(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={onClickCheck}
          label={
            <span>
              I agree to
              <OverlayTrigger placement="right" overlay={popover}>
                <span className="terms-color"> Terms and Conditions</span>
              </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
