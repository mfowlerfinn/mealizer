import React from "react";
import "./RecipeInputForm.css";

const categories = ["main", "side", "dessert", "bread", "drink", "appetizer"];

export const RecipeInputForm = () => {
  return (
    <div >
      <form className="main-form compile-card">
        <input className="form-item" type="text" placeholder="title" required />
        {/* <label for="category-select">Category </label> */}
        <select className="form-item" name="category-select" id="category-select" required>
          <option value="">--Please choose a category--</option>
          {categories.map( item => {
            return <option value={item}>{item}</option>;
          })}
        </select>
        <input className="form-item" type="text" placeholder="subtitle" />
        <textArea className="form-item text-field" type="text" placeholder="description" required />
        <textArea className="form-item text-field" type="text" placeholder="procedure" required />
        {/* <input className="form-item" type="text" placeholder="title" required /> */}
        <input className="form-item" type="submit" value="Add Recipe" />
      </form>
    </div>
  );
};
