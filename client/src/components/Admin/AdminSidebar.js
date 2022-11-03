import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getOrder } from "../../redux/action";


const AdminSidebar = () => {

 const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(getOrder())
  console.log('ENTRE A GET ORDER')
  };


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
        <Link to={"/panel-control/pedidos"} onClick={handleClick}>
          <li>Pedidos</li>
        </Link>
        <Link to={"/panel-control/clientes"}>
          <li>Clientes</li>
        </Link>
      </ul>
    </>
  );
};
export default AdminSidebar;
