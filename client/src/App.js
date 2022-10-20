import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";
import NavScrollExample from "./components/NavBar/navBar";
import Footer from "./components/Footer/footer";
import ProductDetail from "./components/Product/ProductDetail";
import NewProduct from "./components/NewProduct/NewProduct";
import Home from "./components/Home/home";
import User from "./components/Login/User/User";
import Shopping from "./components/Login/User/Shopping";
import Cart from "./components/Cart/Cart";
import { Fragment } from "react";
import LogAdmin from "./components/Login/Admin/LogAdmin";

function App() {
  return (
    <Fragment>
      <Route>
        <NavScrollExample />
      </Route>
      <Route exact path={"/"}>
        <Home />
      </Route>
      <Route exact path={"/store"}>
        <Store />
      </Route>
      <Route path={"/detail/:productId"}>
        <ProductDetail />
      </Route>
      <Route path={"/new"}>
        <LogAdmin />
      </Route>
      <Route path={"/user"}>
        <User />
      </Route>
      <Route path={"/shopping"}>
        <Shopping />
      </Route>
      <Route path={"/carrito"}>
        <Cart />
      </Route>
      <Route>
        <Footer />
      </Route>
      </Fragment>
    
  );
}

export default App;
