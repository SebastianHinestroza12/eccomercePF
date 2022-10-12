import Landing from "./components/Landing";
import { Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/home"}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
