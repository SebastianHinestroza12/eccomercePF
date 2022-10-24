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
import React, { Fragment } from "react";
import LogAdmin from "./components/Login/Admin/LogAdmin";
import Checkout from "./Pages/Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AfDNE98mgkMy8dhaS7qGfn9KML3r3kSIsXt3-jAMMR_gsL2-1bFGijHeHAunQJGSytq1QUWdtMWW02go",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
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
        <Route path={"/user"}>
          <User />
        </Route>
        <Route path={"/shopping"}>
          <Shopping />
        </Route>
        <Route path={"/carrito"}>
          <Cart />
        </Route>
        <Route path={"/new"}>
          <LogAdmin />
        </Route>
        <Route path={"/form"}>
          <NewProduct />
        </Route>
        <Route path={"/pagar"}>
          <Checkout />
        </Route>
        <Route>
          <Footer />
        </Route>
      </Fragment>
    </PayPalScriptProvider>
  );
}

export default App;
