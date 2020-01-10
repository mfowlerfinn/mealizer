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

const restoreLocalMenu = () => {
  if (localStorage.getItem("menu")) {
    let storedString = localStorage.getItem("menu");
    let localMenu = JSON.parse(storedString);
    return localMenu;
  }
  else { 
    return [];
  }
}


function StateProvider({ children }) {
  const [options, setOptions] = useState(dataStructure);
  const [menuIndex, setMenuIndex] = useState(menuStructure);
  const [menuObject, setMenuObject] = useState(restoreLocalMenu);
  const [activeDays, setActiveDays] = useState(days);

  return (
    <LocalStateProvider value={{ options, setOptions, menuIndex, setMenuIndex, activeDays, setActiveDays, menuObject, setMenuObject }}>
      {children}
    </LocalStateProvider>
  );
}

function useGlobalState() {
  const all = useContext(LocalStateContext);
  return all;
}

export { StateProvider, useGlobalState };
