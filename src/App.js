import React, { useState }from "react";
// import './App.css';
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import MenuAppBar from "./components/MenuAppBar";
import CompileMenu from "./components/CompileMenu";
import Recipe from "./components/recipe";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles, ThemeProvider, useTheme, createMuiTheme } from "@material-ui/core/styles";


// need router. login, home, menu, recipe, export functions,

let home = `/compile`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.background,
    color: theme.palette.text.primary,
  },
}));

function App() {
  const classes = useStyles();

    // We keep the theme in app state
    const [theme, setTheme] = useState({
      palette: {
        type: "light"
      }
    });

    const toggleDarkTheme = () => {
      let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
      setTheme({
        palette: {
          type: newPaletteType
        }
      });
    };

    // we generate a MUI-theme from state's theme object
    const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
    <MenuAppBar onToggleDark={toggleDarkTheme} title={"Recipe"}/>
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
    
    </ThemeProvider>
  );
}

export default App;
