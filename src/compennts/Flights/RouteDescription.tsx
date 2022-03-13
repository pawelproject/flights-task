import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Col, Row } from "react-bootstrap";

import { AiOutlineArrowDown } from "react-icons/ai";

interface IRouteDescriptionProps {}

export const RouteDescription: FC<IRouteDescriptionProps> = (props) => {
  const routeData = useAppSelector((state) => state.flights.path);

  return (
    <Row>
      <Col>
        <h3>Airport</h3>
        <div>
          {routeData.airports.map((airport, i, arr) => {
            return (
              <div key={airport}>
                <div>{airport}</div>

                {i !== arr.length - 1 && <AiOutlineArrowDown fill="#0d6efd" />}
              </div>
            );
          })}
        </div>
      </Col>
      <Col>
        <h3>Connection</h3>
        <div>
          {routeData.connections.map((connection, i, arr) => {
            return (
              <div key={i}>
                <div>
                  ['{connection[0]}','{connection[1]}']
                </div>

                {i !== arr.length - 1 && <AiOutlineArrowDown fill="#0d6efd" />}
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};
