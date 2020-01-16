import React, { createContext, useState, useContext, useReducer } from "react";
import { menuReducer, dayReducer } from "./reducers";
import { restoreArrayFromLocal, saveArrayToLocal } from "../static/Helpers";

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

const dataStructure = {
  weeks: 1,
  days: 7,
  servings: 2,
  startDay: 0
};

const days = [
  { day: 0, value: true },
  { day: 1, value: true },
  { day: 2, value: true },
  { day: 3, value: true },
  { day: 4, value: true },
  { day: 5, value: true },
  { day: 6, value: true }
];

const menuStructure = [];

function StateProvider({ children }) {
  const [options, setOptions] = useState(dataStructure);
  const [menuIndex, setMenuIndex] = useState(menuStructure);
  const [menuObject, setMenuObject] = useReducer(
    menuReducer,
    restoreArrayFromLocal("menu")
  );
  const [activeDays, setActiveDays] = useReducer(dayReducer, days);

  return (
    <LocalStateProvider
      value={{
        options,
        setOptions,
        menuIndex,
        setMenuIndex,
        activeDays,
        setActiveDays,
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
