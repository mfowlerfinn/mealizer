import React from "react";
import MenuAppBar from "../components/MenuAppBar";
import { useGlobalState } from "../context/LocalState";
import { IngredientLine } from "../components/IngredientLine";

function Groceries() {
  const { groceries } = useGlobalState();
  const GetItems = () => {
    return groceries.map((item, index) => {
      return (
        <div className="ingredient-container" key={index}>
          {IngredientLine(item)}
        </div>
      );
    });
  };

  return (
    <div>
      <MenuAppBar title={"Groceries"} />
      <div id="main-container">
        <GetItems />
      </div>
    </div>
  );
}

export default Groceries;
