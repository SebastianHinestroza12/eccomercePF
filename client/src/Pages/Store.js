import Cards from "../components/Cards/cards";
import "./store.css";
/**
 * BOOTSTRAP IMPORTS
 */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Product/Sidebar";
import TopStoreFilters from "../components/Filter/TopStoreFilters";
import Carousel from "../components/Carousel/Carousel";
const recetasJsonLocal = require("../utils/productos");

const Store = () => {
  return (
    <>
      <Carousel />
      {console.log("recetasJsonLocal", recetasJsonLocal[0].id)}
      <Container>
        Tienda
        <Row>
          <Col md={3} className="sidebar">
            <Sidebar />
          </Col>
          <Col>
            <TopStoreFilters />
            <Cards />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Store;
