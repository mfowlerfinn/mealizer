import React from "react";
import RecipeData from "../static/recipes.json";
import { IngredientLine } from "./IngredientLine";

const Recipes = () => {
  let n = 0;
  return RecipeData.map((recipe, i) => {
    return (
      <div className="day-container" key={i}>
        <div className="recipe-title">{recipe.title}</div>
        <div className="divider"></div>
        <div className="recipe-subtitle">{recipe.subtitle}</div>
        {recipe.ingredients.map((item) => {
          return IngredientLine(item);
        })}
        <div className="recipe-instructions">
          {recipe.procedures.map((item, index) => {
            return <div className="recipe-instruction" key={index} >{item}</div>;
          })}
        </div>
      </div>
    );
  });
};

export default function RecipeList() {
  return (
    <div>
      <Recipes />
    </div>
  );
}
