import { createContext, useState } from "react";
import "./App.css";
import Welcome from "./Pages/Welcome";
import Register from "./Pages/Register";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Pages/Login";

export const CredentialContext = createContext(null);
function App() {
  const credentials = useState(null);
  return (
    <div className="App">
      <CredentialContext.Provider value={credentials}>
        <Router>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </CredentialContext.Provider>
    </div>
  );
}

export default App;
