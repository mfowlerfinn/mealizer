import React, { Fragment, useState } from "react";
import Data from "../static/data.json";

const Rip = () =>
  Data.recipes.map((recipe, index) => {
    return (
      <div>
        <h1>{recipe.title}</h1>
        <h3>{recipe.ingredients}</h3>
      </div>
    );
  });

let numberOfRecipes = 7;
let len = Data.recipes.length;
let recipesSelected = [];

const Random = () => {
  let jsx = [];
  for (let i = 0; i < numberOfRecipes; i++) {
    let randomIndex = Math.round(Math.random() * len);
    jsx.push(
      <div>
        <h1>{Data.recipes[randomIndex].title}</h1>
        <h3>{`index ${randomIndex}`}</h3>
      </div>
      );
      recipesSelected.push(randomIndex);

  }
  return(jsx);
};

const Indexes = () => {
  return(
  recipesSelected.map((x) => `${x},`)
  );
}



export default function RecipeList() {

  const [recipes, setRecipes] = useState(Data.recipes);
  
  console.log(recipes[1]);

  return (
    <div>
      <Random />
      <Indexes />
    </div>
  );
}
