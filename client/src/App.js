import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";
import NavScrollExample from "./components/NavBar/navBar";
import Footer from "./components/Footer/footer";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <>
      <Route>
        <NavScrollExample />
      </Route>
      <Route path={"/"}>
        <Store />
      </Route>
      <Route path={"/carousel"}>
        <Carousel />
      </Route>
      <Route path={"/detail"}>
        <ProductDetail />
      </Route>
    </>
  );
}

export default App;
