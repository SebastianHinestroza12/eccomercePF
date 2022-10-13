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
      <Route exact path={"/"}>
        <Store />
      </Route>
      <Route path={"/detail/:productId"}>
        <ProductDetail />
      </Route>
      <Route>
        <Footer />
      </Route>
    </>
  );
}

export default App;
