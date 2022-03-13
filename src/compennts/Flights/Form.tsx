import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { calculateRoute } from "../../store/flights";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

interface IFlightFormProps {}

export const FlightForm: FC<IFlightFormProps> = (props) => {
  const airports = useAppSelector((state) => state.flights.airports);
  const dispatch = useAppDispatch();
  const [departureAirport, setDepartureAirport] = useState<string[]>([]);
  const [destinationAirport, setDestinationAirport] = useState<string[]>([]);

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      calculateRoute({ start: departureAirport[0], end: destinationAirport[0] })
    );
  };

  const isSubmitButtonDisabled =
    departureAirport[0] &&
    destinationAirport[0] &&
    departureAirport[0] !== destinationAirport[0]
      ? false
      : true;

  return (
    <Form onSubmit={submitForm}>
      <Row>
        <Col sm>
          <Form.Group className="mb-3">
            <Form.Label>Departure</Form.Label>

            <Typeahead
              id="departure"
              placeholder="Enter starting point"
              options={airports}
              onChange={setDepartureAirport}
              selected={departureAirport}
            />
          </Form.Group>
        </Col>
        <Col sm>
          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>

            <Typeahead
              id="destination"
              placeholder="Enter destination"
              options={airports}
              onChange={setDestinationAirport}
              selected={destinationAirport}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" disabled={isSubmitButtonDisabled}>
        Search
      </Button>
    </Form>
  );
};
