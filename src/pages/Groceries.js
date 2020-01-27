import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import { useGlobalState } from "../context/LocalState";

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
    let groceryKeys = Object.keys(groceries);
    //console.log(groceryKeys);
    return groceryKeys.map((item, index) => {
      //console.log(item);
      let unit = groceries[item].unit != null ? groceries[item].unit : "";
      let dependantRecipes = groceries[item].recipes;
      let quantity = groceries[item].quantity;
      let recipes = dependantRecipes > 1 ? "s" : "";

      return (
        <div className="recipe-ingredients" key={index}>
          <div className="ingredient-pieces">{`${quantity} ${unit} ${item}`}</div>
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
