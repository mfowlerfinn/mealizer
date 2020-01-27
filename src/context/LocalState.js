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
  weeks: 1,
  days: 7,
  servings: 2,
  startDate: today
};

const menuStructure = [];

function StateProvider({ children }) {
  const [options, setOptions] = useReducer(optionsReducer, dataStructure);
  const [groceries, setGroceries] = useState(menuStructure);
  const [menuObject, setMenuObject] = useReducer(
    menuReducer,
    restoreArrayFromLocal("menu")
  );

  const compileGroceryList = () => {
    let arr = {};
    menuObject.map((meal, index) => {
      let dayState = menuObject[index].planDay;
      if (dayState === true) {
        meal.ingredients.map(item => {
          let name = `${item.ingredient}`;
          // console.log(`${name}`);
          let obj = arr[name];
          if (obj && arr[name].quantity) {
            let val = parseInt(item.quantity) + parseInt(obj.quantity);
            //console.log(`adding ${obj.quantity} and ${item.quantity} to get ${val}`);
            arr[name].quantity = val;
            obj.recipes += 1;
          } else {
            let newObj = {};
            newObj.quantity = item.quantity;
            newObj.recipes = 1;
            newObj.unit = item.unit;
            arr[name] = newObj;
          }
        });
      }
      //console.log(arr);
    });
    //console.log(arr);
    setGroceries(arr);
  };

  useEffect(() => {
    console.log("recalc groceries now...");
    compileGroceryList();
  }, [menuObject]);

  return (
    <LocalStateProvider
      value={{
        options,
        setOptions,
        groceries,
        setGroceries,
        menuObject,
        setMenuObject
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
