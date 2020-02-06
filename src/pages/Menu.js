import React, { Fragment } from "react";
import { useGlobalState } from "../context/LocalState";
import MenuAppBar from "../components/MenuAppBar";
import { IngredientLine } from "../components/IngredientLine";

export default function Menu() {
  const { menuObject } = useGlobalState();

  const GetMenu = () => {
    let len = menuObject.length;
    return (
      <Fragment>
        {menuObject.map((meal, index) => {
          let dayState = menuObject[index].planDay;
          return (
            <div className="day-container" key={index}>
              <div className="day-header">
                <div className="day-title">{meal.dayName}</div>
                <div className="day-date">the {meal.dayOfMonth}</div>
                <div className="day-date">
                  {dayState ? `(${meal.servings})` : `not planned`}
                </div>
              </div>
              <div className="divider"></div>
              <div className={dayState ? "menu-card" : "hide"}>
                <div className="recipe-title">{meal.title}</div>
                <div className="recipe-subtitle">{meal.subtitle}</div>
                {meal.ingredients.map( item => {
                  return IngredientLine(item);
                })}
                {meal.procedures.map( item => {
                  return <div className="recipe-instructions">{item}</div>
                })}
                
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div>
      <MenuAppBar title={"Menu"} />
      <GetMenu />
    </div>
  );
}
