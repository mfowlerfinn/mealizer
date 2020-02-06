import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import { useGlobalState } from "../context/LocalState";
import { IngredientLine } from "../components/IngredientLine";

function Groceries() {
  const { menuObject, groceries } = useGlobalState();

  // const GetItems = () => {
  //   let len = menuObject.length;
  //   return menuObject.map((meal, index) => {
  //     let dayState = menuObject[index].planDay;
  //     if (dayState === true) {
  //       return (
  //         <div className="recipe-ingredients">
  //           ( {meal.title} ) (x{meal.servings}) {meal.ingredients}
  //         </div>
  //       );
  //     } else return null;
  //   });
  // };

  const GetItems = () => {
    return groceries.map((item, index) => {

      return (
        <div className="recipe-ingredients" key={index}>
          {IngredientLine(item)}
          {/* <div className="ingredient-pieces">{`${item.quantity} ${(item.unit != 'none') ? item.unit : ""} ${item.item}`}</div> */}
          {/* <div className="ingredient-pieces">{`for ${dependantRecipes} recipe${recipes}`}</div> */}
        </div>
      );
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
