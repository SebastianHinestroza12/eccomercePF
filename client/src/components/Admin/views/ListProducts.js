import React, { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/action";
import { Alert } from "react-bootstrap";
import Pages from "./PageAdmin";

const ListProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products); //allProducts

  const [actualAdminPage, setActualAdminPage] = useState(1);
  const [adminProductsPage, setProductsPage] = useState(12);
  const indexOfLastAdminProduct = actualAdminPage * adminProductsPage;
  const indexOfFirstAdminProduct = indexOfLastAdminProduct - adminProductsPage;
  const actualAdminProducts = products.slice (
    indexOfFirstAdminProduct,
    indexOfLastAdminProduct
  )
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(5);

  const adminPages = (pageNumber) => {
    setActualAdminPage(pageNumber);
    if (pageNumber >= maxPage) {
      setMinPage(minPage + 3);
      setMaxPage(maxPage + 3);
    } else if (pageNumber <= minPage + 1 && pageNumber !== 1) {
      setMinPage(minPage - 3);
      setMaxPage(maxPage - 3);
    }
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <Fragment>
      <br/>
      <Pages
          actualAdminPage={actualAdminPage}
          minPage={minPage}
          maxPage={maxPage}
          adminProductsPage={adminProductsPage}
          adminProducts={Array.isArray(products) ? products.length : 1}
          adminPages={adminPages}
      />

        <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "350px" }}>Nombre</th>
            <th style={{ width: "100px" }}>Precio</th>
            <th style={{ width: "100px" }}>Estado</th>
            <th style={{ width: "350px" }}>Detalle</th>
            <th style={{ width: "100px" }}>checkbox</th>
            <th style={{ width: "80px" }}>boton1</th>
            <th style={{ width: "80px" }}>boton2</th>
          </tr>
        </thead>
      {
        Array.isArray(actualAdminProducts) ? (
          actualAdminProducts.map((e) => (
            <tbody>
            <tr>
              <td style={{ width: "350px", fontSize: "small" }}>{e.name}</td>
              <td style={{ width: "100px", fontSize: "small" }}>{e.price}</td>
              <td style={{ width: "100px", fontSize: "small" }}>
                {e.visible.toString()}
              </td>
              <td style={{ width: "350px", fontSize: "small" }}>{e.detail}</td>
              <td style={{ width: "100px", fontSize: "small" }}>
                <label htmlFor="agotado">Agotado&nbsp;</label>
                <input id="agotado" type="checkbox" />
              </td>
              <td style={{ width: "80px", fontSize: "small" }}>
                <button>Editar</button>
              </td>
              <td style={{ width: "80px", fontSize: "small" }}>
                <button>Eliminar</button>
              </td>
            </tr>
          </tbody>
      ))) : (
        <>
              <Alert key={"warning"} variant={"warning"}>
                {products}
              </Alert>
              <p className="errors"></p>
            </>
      )
      }
      </Table>
    </Fragment>
  );
};

export default ListProducts;
