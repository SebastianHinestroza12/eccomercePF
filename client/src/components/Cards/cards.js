import React, { useRef, useEffect, useState } from "react";
import ProductCard from "../Product/Card";
import "./cards.css";
import Pages from "../Pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";
import Filters from "../Filters/Filters";

const Cards = ({ loading, setLoading }) => {
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();

  /**
   * PAGINADO
   */
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

  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(dispatch(getAllProducts()));
    })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        return error.response.data.error;
      });

    return () => {};
  }, [dispatch]);

  return loading ? (
    <>
      <img src="/images/loader-blue.gif" className="loading" alt="loader" />
    </>
  ) : (
    <div>
      <Filters
        setMinPageNumber={setMinPageNumber}
        setMaxPageNumber={setMaxPageNumber}
        setActualPage={setActualPage}
        setOrder={setOrder}
      />
      <div className="row">
        {Array.isArray(actualproducts) ? (
          actualproducts.map((products) => (
            <div className="col-md-3 tamanio" key={products.id}>
              <ProductCard
                name={products.name}
                price={products.price}
                image={products.image}
                stars={products.stars}
                id={products.id}
              />
            </div>
          ))
        ) : (
          <>
            <p className="errors">{actualproducts}</p>
          </>
        )}
      </div>
      <Pages
        actualPage={actualPage}
        minPageNumber={minPageNumber}
        maxPageNumber={maxPageNumber}
        productsPerPage={productsPerPage}
        products={Array.isArray(allProducts) ? allProducts.length : 1}
        pages={pages}
      />
    </div>
  );
};

export default Cards;
