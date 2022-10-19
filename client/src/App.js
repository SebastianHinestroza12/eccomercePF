import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";
import NavScrollExample from "./components/NavBar/navBar";
import Footer from "./components/Footer/footer";
import ProductDetail from "./components/Product/ProductDetail";
import NewProduct from "./components/NewProduct/NewProduct";
import Home from "./components/Home/home";
import User from "./components/Login/User";
import Shopping from "./components/Login/Shopping";

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
      <Route path={"/user"}>
        <User />
      </Route>
      <Route path={"/shopping"}>
        <Shopping />
      </Route>
      <Route>
        <Footer />
      </Route>
    </> 
  );
}

export default App;
