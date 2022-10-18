import Cards from "../components/Cards/cards";
import React, { useState } from "react";

import "./store.css";
/**
 * BOOTSTRAP IMPORTS
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Store = () => {
  //estado para la carga
  const [loading, setLoading] = useState([true]);

  return (
    <>
      <Container>
        <Row>
          <Col md={-1} className="sidebar">
          </Col>
          <Col>
            <Cards loading={loading} setLoading={setLoading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Store;
