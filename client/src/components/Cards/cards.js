import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../Product/Card";
import "./cards.css";
import Pages from "../Pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, linkCategory } from "../../redux/action";
import Filters from "../Filters/Filters";
import Sidebar from "../Product/Sidebar";
import { Alert, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Cards = ({ loading, setLoading }) => {
  const allProducts = useSelector((state) => state.products);
  const superAllProducts = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  /**
   * PAGINADO
   */
  /* eslint-disable no-unused-vars */
  const appTopRef = useRef();
  const [order, setOrder] = useState("");
  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [productsPerPage, setproductsPerPage] = useState(12); //cuantos products por page
  const indexOfLastproduct = actualPage * productsPerPage;
  const indexOfFirstproduct = indexOfLastproduct - productsPerPage;
  const actualproducts = allProducts.slice(
    indexOfFirstproduct,
    indexOfLastproduct
  ); //recortamos el arreglo con todos los products
  const [minPageNumber, setMinPageNumber] = useState(0);
  const [maxPageNumber, setMaxPageNumber] = useState(5);

  const pages = (pageNumber) => {
    setActualPage(pageNumber);
    appTopRef.current?.scrollIntoView({ behavior: "smooth" });
    if (pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber + 4);
      setMaxPageNumber(maxPageNumber + 4);
    } else if (pageNumber <= minPageNumber + 1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber - 4);
      setMaxPageNumber(maxPageNumber - 4);
    }
  };
  /**
   * FIN PAGINADO
   */

  //CATEGORIA DE PARAMS
  const { category } = useParams();

  useEffect(() => {
    console.log("CATEGORY", category);
    if (superAllProducts.length === 0) {
      dispatch(getAllProducts());
    }
    if (category) {
      dispatch(linkCategory(category));
    }
  }, [allProducts.length, dispatch, setLoading, superAllProducts.length]);

  return !allProducts[0] ? (
    <>
      <Col>
        <img
          src="/images/loader-blue.gif"
          width="200px"
          className="loading"
          alt="loader"
        />
      </Col>
    </>
  ) : (
    <>
      <Col md={3} className="sidebar">
        <Sidebar
          setMinPageNumber={setMinPageNumber}
          setMaxPageNumber={setMaxPageNumber}
          setActualPage={setActualPage}
          setOrder={setOrder}
        />
      </Col>
      <Col md={9}>
        <Filters
          setMinPageNumber={setMinPageNumber}
          setMaxPageNumber={setMaxPageNumber}
          setActualPage={setActualPage}
          setOrder={setOrder}
        />
        <Row className="row">
          {Array.isArray(actualproducts) ? (
            actualproducts.map((products) => {
              if (products.visible !== false) {
                return (
                  <Col md={3} xs={6} key={products.id}>
                    <ProductCard
                      name={products.name}
                      price={products.price}
                      image={products.image}
                      stars={products.stars}
                      id={products.id}
                    />
                  </Col>
                );
              }
            })
          ) : (
            <>
              <Alert key={"warning"} variant={"warning"}>
                {allProducts}
              </Alert>
            </>
          )}
        </Row>
        <Pages
          actualPage={actualPage}
          minPageNumber={minPageNumber}
          maxPageNumber={maxPageNumber}
          productsPerPage={productsPerPage}
          products={Array.isArray(allProducts) ? allProducts.length : 1}
          pages={pages}
        />

        {/*console.log(order, setproductsPerPage)*/}
      </Col>
    </>
  );
};

export default Cards;
