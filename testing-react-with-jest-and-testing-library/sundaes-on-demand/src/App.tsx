import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { OrderEntry } from "./pages/entry/OrderEntry/OrderEntry";
import { OrderConfirmation } from "./pages/OrderConfirmation/OrderConfirmation";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

import "./App.css";

export enum Phases {
  OrderPhase = "OrderPhase",
  ConfirmPhase = "ConfirmPhase",
  SummaryPhase = "SummaryPhase",
}

function App() {
  const [phase, setPhase] = useState(Phases.OrderPhase);

  return (
    <Container>
      <OrderDetailsProvider>
        {phase === Phases.OrderPhase && <OrderEntry setPhase={setPhase} />}
        {phase === Phases.ConfirmPhase && <OrderSummary setPhase={setPhase} />}
        {phase === Phases.SummaryPhase && (
          <OrderConfirmation setPhase={setPhase} />
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
