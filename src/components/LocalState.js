import React, { createContext, useState, useContext } from "react";

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;



const dataStructure = {
  weeks: 1,
  days: 7,
  servings: 2,
  startDay: 0,
};

const days = Array(dataStructure.days).fill(true);

const menuStructure = [];

function StateProvider({ children }) {
  const [options, setOptions] = useState(dataStructure);
  const [menu, setMenu] = useState(menuStructure);
  const [finalMenu, setFinalMenu] = useState(menuStructure);
  const [activeDays, setActiveDays] = useState(days);

  return (
    <LocalStateProvider value={{ options, setOptions, menu, setMenu, activeDays, setActiveDays, finalMenu, setFinalMenu }}>
      {children}
    </LocalStateProvider>
  );
}

function useGlobalState() {
  const all = useContext(LocalStateContext);
  return all;
}

export { StateProvider, useGlobalState };
