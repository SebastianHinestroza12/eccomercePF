import { Route } from "react-router-dom";
import CreateProduct from "./views/CreateProduct";
import ListProducts from "./views/ListProducts";
const ADMIN_ROUTE = "panel-control";

const AdminContent = () => {
  return (
    <>
      <Route exact path={`/${ADMIN_ROUTE}/products`}>
        <ListProducts />
      </Route>
      <Route exact path={`/${ADMIN_ROUTE}/nuevo-producto`}>
        <CreateProduct />
      </Route>
    </>
  );
};
export default AdminContent;
