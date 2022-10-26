import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <h4>PRODUCTOS</h4>
      <ul>
        <Link to={"/panel-control/products"}>
          <li>Productos </li>
        </Link>
        <Link to={"/panel-control/nuevo-producto"}>
          <li>Nuevo producto </li>
        </Link>
        <Link to={"/panel-control/valoraciones"}>
          <li>Valoraciones </li>
        </Link>
      </ul>
      <h4>TIENDA</h4>
      <ul>
        <Link to={"/panel-control/pedidos"}>
          <li>Pedidos</li>
        </Link>
        <Link to={"#"}>
          <li>Clientes</li>
        </Link>
      </ul>
    </>
  );
};
export default AdminSidebar;
