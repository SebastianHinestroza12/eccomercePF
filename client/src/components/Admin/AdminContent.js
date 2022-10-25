import { Route } from "react-router-dom";
import ListProducts from "./views/ListProducts";
import NewProduct from "./views/NewProduct";
const ADMIN_ROUTE = "panel-control";

const AdminContent = () => {
  return (
    <>
      <Route exact path={`/${ADMIN_ROUTE}/products`}>
        <ListProducts />
      </Route>
      <Route exact path={`/${ADMIN_ROUTE}/nuevo-producto`}>
        <NewProduct />
      </Route>
    </>
  );
};
export default AdminContent;
