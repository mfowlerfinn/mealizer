import React, { Fragment } from "react";

let plannedMeals = true;

//get compiled menu from state or database?

function getMenu() {
  if (plannedMeals) {
    return (
      <Fragment>
        <h1>MENU</h1>
        <ul>
          <li>
            today
            <ul>
              <li>dinner</li>
            </ul>
          </li>
          <li>tomorrow</li>
        </ul>
      </Fragment>
    );
  } else {
    return <h2>Menu not yet planned</h2>;
  }
}

export default function Menu() {
  return (
    <div>
      {getMenu()}
      <h3>test</h3>
    </div>
  );
}
