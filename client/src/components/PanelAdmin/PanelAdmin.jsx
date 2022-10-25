import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action";

function PanelAdmin() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  console.log(products);
  const getProducts = () => {
    dispatch(getAllProducts());
  };

  return (
    <Fragment>
      <br/>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link">Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

      <button onClick={getProducts}>Cargar productos</button>
      <div class="table-responsive">
        <table class="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ width: "330px" }}>#</th>
              <th style={{ width: "350px" }}>Nombre</th>
              <th style={{ width: "100px" }}>Precio</th>
              <th style={{ width: "100px" }}>Visible</th>
              <th style={{ width: "350px" }}>Detalle</th>
              <th style={{ width: "100px" }}>checkbox</th>
              <th style={{ width: "80px" }}>boton1</th>
              <th style={{ width: "80px" }}>boton2</th>
            </tr>
          </thead>
        </table>
      </div>
      {products.map((e) => (
        <div class="table-responsive">
          <table style={{ width: "100%" }} class="table table-striped">
            <tbody>
              <tr>
                <th style={{ width: "330px", fontSize: "small" }}>{e.id}</th>
                <td style={{ width: "350px", fontSize: "small" }}>{e.name}</td>
                <td style={{ width: "100px", fontSize: "small" }}>{e.price}</td>
                <td style={{ width: "100px", fontSize: "small" }}>
                  {e.visible.toString()}
                </td>
                <td style={{ width: "350px", fontSize: "small" }}>
                  {e.detail}
                </td>
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
          </table>
        </div>
      ))}
    </Fragment>
  );
}

export default PanelAdmin;
