import React from "react";

let i;

export const IngredientLine = (ingredient, index) => {
  i = index;
  const show = key => {
    let exists = false;

    if (ingredient[key]) {
      let testString = ingredient[key].toString();
      if (testString.length > 0) {
        if (testString !== "none") {
          exists = true;
        }
      }
    }

    return !exists ? null : (
      <div className="ingredient-pieces">
        {ingredient[key]}
      </div>
    );
  };

  return (
    <div className="recipe-ingredients" >
      {show("quantity")}
      {show("unit")}
      {show("item")}
      {show("notes")}
    </div>
  );
};
