import Card from "../components/Product/Card";
import "./store.css";
/**
 * BOOTSTRAP IMPORTS
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Product/Sidebar";
const recetasJsonLocal = require("../utils/productos");

const Store = () => {
  return (
    <>
      {console.log("recetasJsonLocal", recetasJsonLocal[0].id)}
      <Container>
        Tienda
        <Row>
          <Col md={3} className="sidebar">
            <Sidebar />
          </Col>
          <Col>
            <Card
              name={recetasJsonLocal[0].nombre}
              price={recetasJsonLocal[0].precio}
              image={recetasJsonLocal[0].imagen}
              rating={recetasJsonLocal[0].calificación}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Store;
