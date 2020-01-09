import React, { Fragment, useEffect } from "react";
import { useGlobalState } from "./LocalState";

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
  getLocal();
  return (
    <Fragment>
      {meals.map((meal, i) => {
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
  // useEffect(() => {
  //   getLocal();
  //   console.log(meals);
  //   // getMenu();
  // }, [meals])

  return (
    <div>
      <GetMenu />
    </div>
  );
}
