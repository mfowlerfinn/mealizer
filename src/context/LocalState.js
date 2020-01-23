import React, { createContext, useState, useContext, useReducer } from "react";
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
  const [menuIndex, setMenuIndex] = useState(menuStructure);
  const [menuObject, setMenuObject] = useReducer(
    menuReducer,
    restoreArrayFromLocal("menu")
  );

  return (
    <LocalStateProvider
      value={{
        options,
        setOptions,
        menuIndex,
        setMenuIndex,
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
