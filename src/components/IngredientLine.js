import React from "react";

export const IngredientLine = Obj => {
  return (
    <div className="recipe-ingredients">
      <div className="ingredient-pieces" >{Obj.quantity}</div>
      {(Obj.unit != null) ? <div className="ingredient-pieces" >{Obj.unit}</div> : null}
      <div className="ingredient-pieces" >{Obj.ingredient}</div>
    </div>
  );
};
