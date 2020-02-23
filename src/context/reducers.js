import { arrayOfRandomNumbers } from "../static/Helpers";
import Recipes from "../static/recipes.json";
//import Data from "../static/data.json";
import { stringToObj } from "../static/stringHelpers";

import { add, format } from "date-fns";

export const SET_SERVINGS = "SERVINGS";
export const REPLACE_MEAL = "REPLACE_MEAL";
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

// mealType: options.mealType,
// numberOfMeals: options.days,
// startDate: options.startDate,
// servings: options.servings

const getRecipesByCategory = (mealType, numberOfMeals) => {
  let mealTypeArray = Recipes.filter(recipe => {
    return recipe.categoryCode === mealType;
  });
  let indexRange = mealTypeArray.length;
  // console.log(indexRange, " options available");
  let arrayIndex = arrayOfRandomNumbers(numberOfMeals, indexRange);
  let menuArray = arrayIndex.map((val, index) => {
    let mObj = mealTypeArray[val];
    return mObj;
  });
  return menuArray;
};

const getMeals = (mealType, numberOfMeals, startDate, servings, state) => {
  let menuArray = getRecipesByCategory(mealType, numberOfMeals);
  menuArray = menuArray.map((mObj, index) => {
    let date = add(startDate, { days: index });
    mObj.date = date;
    let dayName = format(date, "eeee");
    mObj.dayName = dayName;
    let dayOfMonth = format(date, "do");
    mObj.dayOfMonth = dayOfMonth;
    let dayOfWeek = format(date, "e");
    mObj.dayOfWeek = dayOfWeek;
    mObj.planDay = true;
    mObj.index = index;
    mObj.scale = 1;
    return mObj;
  });
  return menuArray;
};

const replaceMeal = (mealType, mealIndex, state) => {
  let currentMenu = state;
  let [newRecipe] = getRecipesByCategory(mealType, 1);
  currentMenu = currentMenu.map((mObj, index) => {
    if (index === mealIndex) {
      return { ...mObj, ...newRecipe };
    }
    return mObj;
  });
  return currentMenu;
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
    case REPLACE_MEAL:
      return replaceMeal(action.mealType, action.mealIndex, state);
    case PLAN_MEALS:
      return getMeals(
        action.mealType,
        action.numberOfMeals,
        action.startDate,
        action.servings,
        state
      );
    case DAY_IS_ACTIVE:
      return toggleDay(action.day, action.bool, state);
    default:
      return state;
  }
};
