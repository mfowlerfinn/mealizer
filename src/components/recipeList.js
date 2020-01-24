import React from "react";
import Data from "../static/data.json";

const Recipes = () => {
  return Data.recipes.map((recipe, i) => {
    return (
      <div className="day-container" key={i}>
        <div className="recipe-title">{recipe.title}</div>
        <div className="divider"></div>
        <div className="recipe-subtitle">{recipe.subtitle}</div>
        <div className="recipe-ingredients">{recipe.ingredients}</div>
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
