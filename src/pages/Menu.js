import React, { Fragment, useEffect } from "react";
import { useGlobalState } from "../context/LocalState";
import MenuAppBar from "../components/MenuAppBar";

let plannedMeals = false;
let meals = [];

const getLocal = () => {
  let item = "final";
  if (localStorage.getItem(item)) {
    let storedString = localStorage.getItem(item);
    meals = JSON.parse(storedString);
    // console.log(meals);
    plannedMeals = true;
    // return storedArray;
  } else {
    plannedMeals = false;
  }
};

//get compiled menu from state or database?

const GetMenu = () => {
  // getLocal();
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

  return (
    <Fragment>
      {menuObject.map((meal, i) => {
        return (
          <div key={i}>
            <h1>{meal.title}</h1>
            <ul>
              <li>{meal.subtitle}</li>
            </ul>
          </div>
        );
      })}
    </Fragment>
  );
};

export default function Menu() {

  return (
    <div>
      <MenuAppBar title={"menu"} />
      <GetMenu />
    </div>
  );
}
