import React, { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "./LocalState";
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

export default function CompileMenu() {
  const {
    options,
    setOptions,
    menu,
    setMenu,
    activeDays,
    setActiveDays
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
    setMenu(arr);
  }





  // let day = new Date().getDay();
  let day = options.startDay;
  let dayString = weekday[day];
  let recipeCards = [];
  let days = options.days;
  let servings = options.servings;
  // setDefaultState(day, days);

  const classes = useStyles();

  const Cards = () => {
    recipeCards = [];
    if(!menu[1]) getRandomIndex(options.days);
    for (let i = 0; i < days; i++) {
      let dayKey = day + i;
      let dayNum = dayKey % 7;
      dayString = weekday[dayNum];
      let index = menu[i] ? menu[i] : 0;
      let title = Data.recipes[index].title;
      let subtitle = Data.recipes[index].subtitle;
      let description = Data.recipes[index].description;
      // console.log({dayNum, dayString});

      // jsx.push(
      //   <div>
      //     <h1>{Data.recipes[randomIndex].title}</h1>
      //     <h3>{`index ${randomIndex}`}</h3>
      //   </div>
      //   );
      //   recipesSelected.push(randomIndex);

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
    return recipeCards;
  };

  useEffect(() => {
    Cards();
  }, [menu]);

  return (
    <Fragment>
      <Button onClick={() => getRandomIndex(options.days)}>Shuffle</Button>
      {Cards()}
    </Fragment>
  );
}
