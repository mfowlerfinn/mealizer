import React, { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "../components/LocalState";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import Data from "../static/data.json";

//get options previously selected... allow set to "default for user"
//show options to compile menu but deprioritize them (opt-in)
//let user set options if desired (opt-in) (# of days, recipe blacklist, ) + (meals per day, meal composition, recipe repo)
//on submit => gather options, show progress, run recipe sorting functions, display list of new menu, allow editing(re-run, re-set options, manually arrange, deselect days, move to recipe blacklist, add to recipe favorites?)
//when happy, "confirm" menu => sets menu in state, compiles grocery list, pushes to ical?

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  },
  title: {
    fontSize: 16
  },
  content: {},
  day: {
    paddingTop: 15,
    marginLeft: 20,
    display: "inline-block"
  },
  pos: {
    marginBottom: 12
  },
  formControl: {
    margin: 1,
    minWidth: 120
  },
  hide: {
    display: "none"
  }
});

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let isStoredLocal = false;

export default function CompileMenu() {
  const {
    options,
    setOptions,
    menuIndex,
    setMenuIndex,
    activeDays,
    setActiveDays,
    menuObject,
    setMenuObject
  } = useGlobalState();

  const handleChange = e => {
    setActiveDays({ ...activeDays, [e.target.name]: e.target.checked });
  };

  function getRandomIndex(n) {
    // setMenu([]);
    let arr = [];
    for (let i = 0; i < n; i++) {
      let len = Data.recipes.length;
      let randomIndex = Math.round(Math.random() * len);
      arr.push(randomIndex);
    }
    setMenuIndex(arr);
  }

  const saveMenuToLocal = () => {
    if (menuIndex.length > 0) {
      let arr = menuIndex.map(val => Data.recipes[val]);
      setMenuObject(arr);
      let local = JSON.stringify(arr);
      localStorage.setItem("menu", local);
      console.log(arr);
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log(menuObject);
  }, [menuObject]);

  let day = options.startDay;
  let recipeCards = [];
  let days = options.days;
  let servings = options.servings;

  const classes = useStyles();

  const CardConstructor = () => {
    return (
      <div>
        {menuObject.map((meal, index) => {
          return (
            <div className="day-container" key={index}>
              <div className="day-header">
                <label className="switch">
                  <input type="checkbox" name={`${index}`}  onChange={(e) => console.log(`day ${index} is ${e.target.checked}`)} />
                  <span className="slider round"></span>
                </label>
                <div className="day-title">dayname</div>
                <div className="day-options">
                  <Button>Swap</Button>
                  <Button>shuffle</Button>
                  <Button>servings</Button>
                  <Button>additional</Button>
                </div>
              </div>
              <div className="recipe-card" id={index}>
                <div className="recipe-title">{meal.title}</div>
                <div className="recipe-subtitle">{meal.subtitle}</div>
                <div className="recipe-description">{meal.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const Cards = () => { //material-ui rendering
    recipeCards = [];

    if (menuIndex.length > 1) {
      for (let i = 0; i < menuIndex.length; i++) {
        let dayKey = day + i;
        let dayNum = dayKey % 7;
        let dayString = weekday[dayNum];
        let index = menuIndex[i];
        let title = Data.recipes[index].title;
        let subtitle = Data.recipes[index].subtitle;
        let description = Data.recipes[index].description;

        recipeCards.push(
          <Card key={dayKey} className={classes.card}>
            <CardContent className={classes.content}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeDays[dayKey] ? true : false}
                    name={`${dayKey}`}
                    color="primary"
                    onChange={handleChange}
                  />
                }
                label={dayString}
              />
              <div className={activeDays[dayKey] ? null : classes.hide}>
                {/* {(checked) && (checked[dayKey]) ? null : display: none} */}
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {subtitle}
                </Typography>
                <Typography variant="body2" component="p">
                  {description}
                </Typography>
                {/* <Typography color="textSecondary">estimated time</Typography> */}
              </div>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        );
      }
    }
    return recipeCards;
  };

  function handleLocal() {
    localStorage.setItem("menuIndex", menuIndex);
  }

  function restoreLocalMenu() {
    if (localStorage.getItem("menu")) {
      let storedString = localStorage.getItem("menu");
      let storedMenu = JSON.parse(storedString);
      setMenuObject(storedMenu);
      isStoredLocal = true;
    } else {
      getRandomIndex(options.days);
      isStoredLocal = false;
    }
  }

  // useEffect(() => {
  //   Cards();
  //   // console.log(menu)
  // }, [menuObject]);

  useEffect(() => {
    saveMenuToLocal();
  }, [menuIndex]);

  useEffect(() => {
    console.log(menuObject);
  }, []);

  return (
    <Fragment>
      <Button onClick={() => console.log("options!")}>Options</Button>
      <Button onClick={() => getRandomIndex(options.days)}>Shuffle</Button>
      <Button onClick={handleLocal}>Store</Button>
      <Button onClick={restoreLocalMenu}>Restore</Button>
      {/* {Cards()} */}
      <CardConstructor />
    </Fragment>
  );
}
