import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Store from "./Pages/Store";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/store"}>
        <Store />
      </Route>
    </>
  );
}

export default App;
