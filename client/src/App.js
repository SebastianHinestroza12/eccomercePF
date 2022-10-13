import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";
import Carousel from "./components/Carousel/Carousel";
import ProductDetail from "./components/Product/ProductDetail";

function App() {
  return (
    <>
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/store"}>
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
