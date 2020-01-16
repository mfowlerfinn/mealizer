import React from "react";
import RecipeList from "../components/RecipeList";
import MenuAppBar from "../components/MenuAppBar";

export default function recipe() {
  return (
    <div>
      <MenuAppBar title={"recipes"} />
      <RecipeList />
    </div>
  );
}
