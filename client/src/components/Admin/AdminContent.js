import { Route, Switch } from "react-router-dom";
import AllProducts from "./views/AllProducts";
import CreateProduct from "./views/CreateProduct";
import Orders from "./views/orders/Orders";
import AdminReviews from "./views/reviews/AdminReviews";
const ADMIN_ROUTE = "panel-control";

const AdminContent = () => {
  return (
    <>
      <Route exact path={`/${ADMIN_ROUTE}/products`}>
        <AllProducts />
      </Route>
      <Switch>
        <Route path={`/${ADMIN_ROUTE}/nuevo-producto/:productId`}>
          <CreateProduct />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/nuevo-producto/`}>
          <CreateProduct />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/valoraciones/`}>
          <AdminReviews />
        </Route>
        <Route exact path={`/${ADMIN_ROUTE}/pedidos/`}>
          <Orders />
        </Route>
      </Switch>
    </>
  );
};
export default AdminContent;
