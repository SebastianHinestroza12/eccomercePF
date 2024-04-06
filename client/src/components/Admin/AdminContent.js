import { Route, Switch } from "react-router-dom";
import AllProducts from "./views/AllProducts";
import CreateProduct from "./views/CreateProduct";
import EditProduct from "./views/EditProduct";
import Orders from "./views/orders/Orders";
import AdminReviews from "./views/reviews/AdminReviews";
import Users from './views/users/AdminUsers'
const ADMIN_ROUTE = "panel-control";

const AdminContent = () => {
  return (
    <>
      <Route exact path={`/${ADMIN_ROUTE}/products`}>
        <AllProducts />
      </Route>
      <Switch>
        {/*<Route path={`/${ADMIN_ROUTE}/nuevo-producto/:productId`}>
          <CreateProduct />
        </Route>*/}
        <Route exact path={`/${ADMIN_ROUTE}/nuevo-producto/`}>
          <CreateProduct />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/editar-producto/:productId`}>
          <EditProduct />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/valoraciones/`}>
          <AdminReviews />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/pedidos/`}>
          <Orders />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/clientes/`}>
          <Users />
        </Route>
      </Switch>
    </>
  );
};
export default AdminContent;
