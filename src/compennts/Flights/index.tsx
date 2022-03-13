import { FC, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { fetchData } from "../../store/flights";
import { Col, Row } from "react-bootstrap";
import { FlightForm } from "./Form";
import { RouteDescription } from "./RouteDescription";
import "./index.css";

interface IFlightsProps {}

export const Flights: FC<IFlightsProps> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <>
      <Row className="justify-content-md-center flights-container">
        <Col lg={8}>
          <FlightForm />
          <br />
          <RouteDescription />
        </Col>
      </Row>
    </>
  );
};
