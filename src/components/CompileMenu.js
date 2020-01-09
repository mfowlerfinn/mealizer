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

let isStoredLocal = false;

export default function CompileMenu() {
  const {
    options,
    setOptions,
    menu,
    setMenu,
    activeDays,
    setActiveDays,
    finalMenu,
    setFinalMenu
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

  const setMenuObject = () => {
    let final = menu.map(val => Data.recipes[val]);
    setFinalMenu(final);
    let local = JSON.stringify(final);
    localStorage.setItem("final", local);
    console.log(final);
  };

  useEffect(() => {
    console.log(finalMenu);
  }, [finalMenu]);

  let day = options.startDay;
  let recipeCards = [];
  let days = options.days;
  let servings = options.servings;

  const classes = useStyles();

  const Cards = () => {
    recipeCards = [];
    if (menu.length > 1) {
      for (let i = 0; i < menu.length; i++) {
        let dayKey = day + i;
        let dayNum = dayKey % 7;
        let dayString = weekday[dayNum];
        let index = menu[i];
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

  // const CardConstructor = () => {
  //   return (
  //     <div>
  //       {menu.map((meal, index) => {
  //         console.log({ meal, index });
  //         let dayKey = index;
  //         let dayNum = dayKey % 7;
  //         dayString = weekday[dayNum];
  //         let title = Data.recipes[index].title;
  //         let subtitle = Data.recipes[index].subtitle;
  //         let description = Data.recipes[index].description;
  //         return (
  //           <Card key={dayKey} className={classes.card}>
  //             <CardContent className={classes.content}>
  //               <FormControlLabel
  //                 control={
  //                   <Checkbox
  //                     checked={activeDays[dayKey] ? true : false}
  //                     name={`${dayKey}`}
  //                     color="primary"
  //                     onChange={handleChange}
  //                   />
  //                 }
  //                 label={dayString}
  //               />
  //               <div className={activeDays[dayKey] ? null : classes.hide}>
  //                 {/* {(checked) && (checked[dayKey]) ? null : display: none} */}
  //                 <Typography variant="h6" component="h2">
  //                   {title}
  //                 </Typography>
  //                 <Typography className={classes.pos} color="textSecondary">
  //                   {subtitle}
  //                 </Typography>
  //                 <Typography variant="body2" component="p">
  //                   {description}
  //                 </Typography>
  //                 {/* <Typography color="textSecondary">estimated time</Typography> */}
  //               </div>
  //             </CardContent>
  //             {/* <CardActions>
  //             <Button size="small">Learn More</Button>
  //           </CardActions> */}
  //           </Card>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  function handleLocal() {
    localStorage.setItem("menu", menu);
  }

  function restoreLocal() {
    if (localStorage.getItem("menu")) {
      let storedMenu = localStorage.getItem("menu");
      let arr = storedMenu.split(",");
      let storedMenuIndex = arr.map(val => parseInt(val));
      setMenu(storedMenuIndex);
      isStoredLocal = true;
    } else {
      getRandomIndex(options.days);
      isStoredLocal = false;
    }
  }

  useEffect(() => {
    Cards();
    // console.log(menu)
    setMenuObject();
  }, [menu]);

  useEffect(() => {
    restoreLocal();
  }, []);

  return (
    <Fragment>
      <Button onClick={() => getRandomIndex(options.days)}>Shuffle</Button>
      <Button onClick={handleLocal}>Store</Button>
      <Button onClick={restoreLocal}>Restore</Button>
      {Cards()}
    </Fragment>
  );
}
