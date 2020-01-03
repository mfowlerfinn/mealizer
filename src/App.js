import React, { useState }from "react";
// import './App.css';
import Menu from "./components/Menu";
import SignIn from "./components/SignIn";
import MenuAppBar from "./components/MenuAppBar";
import CompileMenu from "./components/CompileMenu";
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
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

function App() {
  const classes = useStyles();

    // We keep the theme in app state
    const [theme, setTheme] = useState({
      palette: {
        type: "dark"
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
    <Router>
      <Switch>
          <Route exact path="/">
            <SignIn home={home}/>
          </Route>
          <Route path={home}>
            <MenuAppBar onToggleDark={toggleDarkTheme}/>
            <CompileMenu />
          </Route>
        </Switch>

    </Router>
    </ThemeProvider>
  );
}

export default App;
