import React, { Fragment, useState } from "react";
import Data from "../static/data.json";
import Card from "@material-ui/core/Card";

const Recipes = () => {
  let jsx = [];
  return Data.recipes.map((recipe, i) => {
    return (
      <Card key={i}>
        <h1>{recipe.title}</h1>
        <h3>{`index ${i}`}</h3>
      </Card>
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
