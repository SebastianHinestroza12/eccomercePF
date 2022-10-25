import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="nav-left">Sidebar</div>
      PRODUCTOS
      <ul>
        <li>
          <Link to={"/panel-control/products"}>Productos</Link>
        </li>
        <li>
          <Link to={"/panel-control/nuevo-producto"}>Nuevo producto</Link>
        </li>
      </ul>
    </>
  );
};
export default AdminSidebar;
