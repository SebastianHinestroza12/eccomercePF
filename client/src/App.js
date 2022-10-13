import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";

function App() {
  return (
    <>

      <Route path={"/"}>
        <Store />
      </Route>
    </>
  );
}

export default App;
