import React, { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "../context/LocalState";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Switch from "../components/Switch";
import { PLAN_MEALS, DAY_IS_ACTIVE } from "../context/reducers";
import { saveArrayToLocal } from "../static/Helpers";
import MenuAppBar from "../components/MenuAppBar";
import OptionBar from "../components/OptionBar";

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

// console.log(App.props.location);

export default function CompileMenu() {
  const {
    options,
    setOptions,
    menuIndex,
    setMenuIndex,
    menuObject,
    setMenuObject
  } = useGlobalState();

  useEffect(() => {
    saveArrayToLocal(menuObject, "menu");
  }, [menuObject]);

  let day = options.startDay;
  let recipeCards = [];
  let days = options.days;
  let servings = options.servings;

  const classes = useStyles();

  function handleSwitch(index) {
    let newVal = !menuObject[index].planDay;
    setMenuObject({ type: DAY_IS_ACTIVE, day: index, bool: newVal });
  }

  const CardConstructor = () => {
    return (
      <div>
        {menuObject.map((meal, index) => {
          let dayState = menuObject[index].planDay;
          return (
            <div className="day-container" key={index}>
              <div className="day-header">
                <Switch
                  isOn={dayState}
                  handleToggle={handleSwitch}
                  index={index}
                />
                <div className="day-title">{meal.dayName}</div>
                <div className="day-date">the {meal.dayOfMonth}</div>
                <div className={dayState ? "day-options" : classes.hide}>
                  {/*<Button>options</Button>*/}
                </div>
              </div>

              <div
                className={dayState ? "recipe-card" : classes.hide}
                id={index}
              >
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

  const isMenuStored = () => {
    if (!(menuObject.length > 0)) shuffle();
  };

  const shuffle = () => {
    setMenuObject({
      type: PLAN_MEALS,
      numberOfMeals: options.days,
      startDate: options.startDate
    });
  };

  useEffect(() => {
    isMenuStored();
  }, []);

  return (
    <Fragment>
      <MenuAppBar title={"Mealizer"} />
      <OptionBar shuffle={shuffle} />

      <CardConstructor />
    </Fragment>
  );
}
