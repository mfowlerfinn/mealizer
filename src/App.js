import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import CompileMenu from "./pages/CompileMenu";
import Recipe from "./pages/Recipe";
import Groceries from "./pages/Groceries";
import MenuAppBar from "./components/MenuAppBar";

import { StateProvider } from "./components/LocalState";

function App() {
  return (
    <StateProvider>
      <Router>
        <MenuAppBar title={"title"} />
        <Switch>
          <Route exact path="/">
            <CompileMenu />
          </Route>
          <Route exact path="/menu">
            <Menu />
          </Route>
          <Route exact path="/groceries">
            <Groceries />
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
