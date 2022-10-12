import Card from "../components/Product/Card";

/**
 *
 * BOOTSTRAP IMPORTS
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Store = () => {
  return (
    <>
      <Container>
        Tienda
        <Row>
          <Col md={3}>Sidebar filters</Col>
          <Col>
            <Card />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Store;