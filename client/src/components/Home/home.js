import React, { useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { getAllProducts } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import ProductCard from "../Product/Card";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Container fluid className="homepage">
      <Carousel />

      <div className="filters_container mt-3">
        <main className="page-content">
          <div className="home-card">
            <div className="content">
              <h2 className="title">Camisetas</h2>
              <p className="copy">
                Todas las camisetas de las mejores selecciones del mundo
              </p>
              <Nav.Link href="/store/jersey" className="navLinks">
                <button className="home-btn">Ir a tienda</button>
              </Nav.Link>
            </div>
          </div>
          <div className="home-card">
            <div className="content">
              <h2 className="title">Pantalones</h2>
              <p className="copy">
                Todos los pantalones de las mejores selecciones del mundo
              </p>
              <Nav.Link href="/store/shorts" className="navLinks">
                <button className="home-btn">Ir a tienda</button>
              </Nav.Link>
            </div>
          </div>
          <div className="home-card">
            <div className="content">
              <h2 className="title">Botines</h2>
              <p className="copy">Botines de los mejores jugadores del mundo</p>
              <Nav.Link href="/store/calzado" className="navLinks">
                <button className="home-btn">Ir a tienda</button>
              </Nav.Link>
            </div>
          </div>
          <div className="home-card">
            <div className="content">
              <h2 className="title">Balones</h2>
              <p className="copy">
                Balones oficiales del mundial, incluido el balon de
                entrenamiento!
              </p>
              <Nav.Link href="/store/balón" className="navLinks">
                <button className="home-btn">Ir a tienda</button>
              </Nav.Link>
            </div>
          </div>
        </main>
      </div>
      <section className="container center-row">
        <h2 className="title-home mb-5 align-center">Nuevos productos</h2>
        <Row>
          {allProducts.slice(0, 6).map((product) => {
            return (
              <Col md={2} xs={6} key={product.id}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  stars={product.stars}
                  id={product.id}
                />
              </Col>
            );
          })}
        </Row>
        <Link class="btn btn-primary align-center" to="/store">
          VER TODOS <Unicons.UilArrowRight />
        </Link>
      </section>
      <section className="mt-5 row-balones">
        <div className="container">
          <Col md={4} className="one">
            <h2 className="title-home">Balones del modelo oficial</h2>
            <p>
              Contamos con las mejores marcas y productos del mundo. Adidas,
              Nike, Puma confian en nosotros y vos tambien podes hacerlo. Hace
              tu pedido ya!
            </p>
            <Link class="btn btn-primary align-center" to="/product/balón">
              VER MÁS <Unicons.UilArrowRight />
            </Link>
          </Col>
          <Col></Col>
        </div>
      </section>

      <div className="testimonios">
        <h2>Testimonios</h2>
        <p>proximamente</p>
      </div>
    </Container>
  );
};

export default Home;
