import Landing from "./components/Landing";
import { Route } from "react-router-dom"; 

function App() {
  return (
    <div>
      <Route exact path={"/"}>
        <Landing />
      </Route>
    </div>
    
  );
}

export default App;
