import { arrayOfRandomNumbers } from "../static/Helpers";
import Data from "../static/data.json";

import { add, format } from "date-fns";

export const SET_SERVINGS = "SERVINGS";
export const SET_MENU_FOR_DAY = "MENU_FOR_DAY";
export const DAY_IS_ACTIVE = "DAY_IS_ACTIVE";
export const PLAN_MEALS = "PLAN_MEALS";

const setServings = (menuId, servings, state) => {
  //find meal in menu
  //check if servings actually changed
  //set servings prop
  //scale all ingredients
  //
};

const toggleDay = (day, bool, state) => {
  let newArr = state.map(item => {
    if (item.index === day) {
      item.planDay = bool;
      return item;
    } else {
      return item;
    }
  });
  return newArr;
};

const getMeals = (numberOfMeals, startDate, state) => {
  let indexRange = Data.recipes.length;
  let arrayIndex = arrayOfRandomNumbers(numberOfMeals, indexRange);
  let menuArray = arrayIndex.map((val, index) => {
    let date = add(startDate, { days: index });
    let mObj = Data.recipes[val];
    mObj.date = date;
    let dayName = format(date, "eeee");
    mObj.dayName = dayName;
    let dayOfMonth = format(date, "do");
    mObj.dayOfMonth = dayOfMonth;
    let dayOfWeek = format(date, "e");
    mObj.dayOfWeek = dayOfWeek;
    mObj.planDay = true;
    mObj.index = index;
    return mObj;
  });
  return menuArray;
};

export const optionsReducer = (state, action) => {
  let newOptions = {
    ...state,
    ...action
  };
  return newOptions;
};

export const menuReducer = (state, action) => {
  switch (action.type) {
    case SET_SERVINGS:
      return setServings(action.menuId, action.servings, state);
    case SET_MENU_FOR_DAY:
      return;
    case PLAN_MEALS:
      return getMeals(action.numberOfMeals, action.startDate, state);
    case DAY_IS_ACTIVE:
      return toggleDay(action.day, action.bool, state);
    default:
      return state;
  }
};
