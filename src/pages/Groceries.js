import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import { useGlobalState } from "../context/LocalState";

function Groceries() {
  const { menuObject } = useGlobalState();

  const GetItems = () => {
    let len = menuObject.length;
    return menuObject.map((meal, index) => {
      let dayState = menuObject[index].planDay;
      if (dayState === true) {
        return (
          <div className="recipe-ingredients">
            ( {meal.title} ) (x{meal.servings}) {meal.ingredients}
          </div>
        );
      } else return null;
    });
  };

  return (
    <div>
      <MenuAppBar title={"Groceries"} />
      <div className="day-container">
        <GetItems />
      </div>
    </div>
  );
}

export default Groceries;
