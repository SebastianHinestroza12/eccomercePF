import React, { Fragment, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/action";
import * as Unicons from "@iconscout/react-unicons";

import "./listProducts.css";

const ListProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <Fragment>
      <br />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "350px" }}>Nombre</th>
            <th style={{ width: "100px" }}>Precio</th>
            <th style={{ width: "100px" }}>Estado</th>
            <th style={{ width: "350px" }}>Detalle</th>
            <th style={{ width: "100px" }}>Agotado</th>
            <th style={{ width: "80px" }}>Editar</th>
            <th style={{ width: "80px" }}>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((e) => (
            <tr>
              <td style={{ width: "350px", fontSize: "small" }}>{e.name}</td>
              <td style={{ width: "100px", fontSize: "small" }}>{e.price}</td>
              <td style={{ width: "100px", fontSize: "small" }}>
                {e.visible === true ? (
                  <span>Publicado</span>
                ) : (
                  <span>Borrador</span>
                )}
              </td>
              <td style={{ width: "350px", fontSize: "small" }}>{e.detail}</td>
              <td style={{ width: "100px", fontSize: "small" }}>
                <input id="agotado" type="checkbox" />
              </td>
              <td style={{ width: "80px", fontSize: "small" }}>
                <button
                  className="edit btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <Unicons.UilEdit />
                </button>
              </td>
              <td style={{ width: "80px", fontSize: "small" }}>
                <button className="edit btn btn-primary">
                  <Unicons.UilTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListProducts;
