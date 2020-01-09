import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import MenuAppBar from "./components/MenuAppBar";
import CompileMenu from "./components/CompileMenu";
import Recipe from "./components/recipe";

import { StateProvider } from "./components/LocalState";

function App() {
  return (
    <StateProvider>
      <MenuAppBar title={"title"} />
      <Router>
        <Switch>
          <Route exact path="/">
            <CompileMenu />
          </Route>
          <Route exact path="/menu">
            <Menu />
          </Route>
          <Route exact path="/recipe">
            <Recipe />
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
