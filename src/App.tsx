import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Flights } from "./compennts/Flights";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="container">
      <Flights />
    </Container>
  );
}

export default App;
