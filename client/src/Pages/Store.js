import Card from "../components/Product/Card";
import "./store.css";
/**
 * BOOTSTRAP IMPORTS
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
const recetasJsonLocal = require("../utils/productos");

const Store = () => {
  const alertClicked = () => {
    alert("You clicked the ListGroupItem");
  };

  return (
    <>
      {console.log("recetasJsonLocal", recetasJsonLocal[0].id)}
      <Container>
        Tienda
        <Row>
          <Col md={3} className="sidebar">
            <ListGroup variant="flush" className="filters_container">
              <h5>CATEGORIAS</h5>
              <ListGroup.Item action onClick={alertClicked}>
                Cras justo odio
              </ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>

            <div className="filters_container mt-3">
              <h5>MARCAS</h5>

              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label={`default ${type}`}
                    />
                  </div>
                ))}
              </Form>
            </div>

            <div className="filters_container mt-3">
              <h5>RATING</h5>

              <Form>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label={`★★★★★`}
                    />
                    <Form.Check
                      type={type}
                      id={`default-${type}`}
                      label={`★★★★☆`}
                    />
                  </div>
                ))}
              </Form>
            </div>
          </Col>
          <Col>
            <Card
              name={recetasJsonLocal[0].nombre}
              price={recetasJsonLocal[0].precio}
              image={recetasJsonLocal[0].imagen}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Store;
