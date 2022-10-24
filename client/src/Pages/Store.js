import Cards from "../components/Cards/cards";
import React, { useState } from "react";

import "./store.css";
/**
 * BOOTSTRAP IMPORTS
 */
import { Container, Row } from "react-bootstrap";

const Store = () => {
  //estado para la carga
  const [loading, setLoading] = useState([true]);

  return (
    <>
      <Container>
        <Row>
          <Cards loading={loading} setLoading={setLoading} />
        </Row>
      </Container>
    </>
  );
};
export default Store;
