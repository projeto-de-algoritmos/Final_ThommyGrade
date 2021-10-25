import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Materias } from "./pages/Materias";
import { Escolha } from "./pages/Escolha";

import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/materias" exact component={Materias} />
          <Route path="/escolha" exact component={Escolha} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
