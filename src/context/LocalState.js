import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect
} from "react";
import { menuReducer, optionsReducer } from "./reducers";
import { restoreArrayFromLocal } from "../static/Helpers";
import { startOfToday } from "date-fns";

const today = startOfToday();

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

const dataStructure = {
  mealType: 'M',
  weeks: 1,
  days: 7,
  servings: 2,
  startDate: today,
  
};

const RECIPETYPES = [
  "Main dish",
  "Salad",
  "Appetizer or snack",
  "Soup",
  "Bread/pasta",
  "Dessert",
  "Beverage (Liquid)",
  "Vegetable dish",
  "Cookie or cake",
  "Other",
  "Sauce"
];

const RECIPECODES = ["M", "SL", "A", "SP", "B", "D", "L", "V", "C", "O", "S"];

const menuStructure = [];

function StateProvider({ children }) {
  const [options, setOptions] = useReducer(optionsReducer, dataStructure);
  const [groceries, setGroceries] = useState(menuStructure);
  const [menuObject, setMenuObject] = useReducer(
    menuReducer,
    restoreArrayFromLocal("menu")
  );

  const compileGroceryList = () => {
    let arr = [];
    menuObject.forEach((meal, index) => {
      let dayState = menuObject[index].planDay;
      if (dayState === true) {
        meal.ingredients.forEach(item => {
          if (item.type === "ingredient") {
            let num, unit, name;
            let match = false;
            [num, unit, name] = [item.quantity, item.unit, item.item];
            num = parseFloat(num);
            let result = {};
            result.quantity = num;
            result.unit = unit;
            result.item = name;

            arr.forEach((item, index) => {
              if (item.item === name) {
                // console.log("match name");
                if (item.unit === unit) {
                  result.quantity += num;
                  arr[index] = result;
                  // console.log("match units");
                  match = true;
                } else {
                  // console.log(unit, item.unit, item.item);
                }
              }
            });
            if (!match) arr.push(result);
          }
        });
      }
    });
    // console.log(arr);
    setGroceries(arr);
  };

  useEffect(() => {
    console.log("recalc groceries now...");
    compileGroceryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuObject]);

  return (
    <LocalStateProvider
      value={{
        options,
        setOptions,
        groceries,
        setGroceries,
        menuObject,
        setMenuObject,
        RECIPETYPES,
        RECIPECODES
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useGlobalState() {
  const all = useContext(LocalStateContext);
  return all;
}

export { StateProvider, useGlobalState };
