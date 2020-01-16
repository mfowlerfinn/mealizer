import { arrayOfRandomNumbers } from "../static/Helpers";
import Data from "../static/data.json";

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
    if (item.day === day) {
      return { day: day, value: bool };
    } else {
      return item;
    }
  });
  return newArr;
};

const getMeals = (numberOfMeals, state) => {
  let indexRange = Data.recipes.length;
  let arrayIndex = arrayOfRandomNumbers(numberOfMeals, indexRange);
  let menuArray = arrayIndex.map((val, index) => {
    let mObj = Data.recipes[val];
    mObj.day = index;
    return mObj;
  });
  return menuArray;
};

export const dayReducer = (state, action) => {
  switch (action.type) {
    case DAY_IS_ACTIVE:
      return toggleDay(action.day, action.bool, state);
    default:
      return state;
  }
};

export const menuReducer = (state, action) => {
  switch (action.type) {
    case SET_SERVINGS:
      return setServings(action.menuId, action.servings, state);
    case SET_MENU_FOR_DAY:
      return;
    case PLAN_MEALS:
      return getMeals(action.numberOfMeals, state);
    default:
      return state;
  }
};
