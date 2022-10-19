import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";
import NavScrollExample from "./components/NavBar/navBar";
import Footer from "./components/Footer/footer";
import ProductDetail from "./components/Product/ProductDetail";
import NewProduct from "./components/NewProduct/NewProduct";
import Home from "./components/Home/home";
<<<<<<< HEAD
import User from "./components/Login/User";
import Shopping from "./components/Login/Shopping";
=======
import Cart from "./components/Cart/Cart";
>>>>>>> 158d44417047b19a9543194f1462515c3ab5a058

function App() {
  return (
    <>
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
        <NewProduct />
      </Route>
<<<<<<< HEAD
      <Route path={"/user"}>
        <User />
      </Route>
      <Route path={"/shopping"}>
        <Shopping />
=======
      <Route path={"/carrito"}>
        <Cart />
>>>>>>> 158d44417047b19a9543194f1462515c3ab5a058
      </Route>
      <Route>
        <Footer />
      </Route>
    </> 
  );
}

export default App;
