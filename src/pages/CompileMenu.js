import React, { Fragment, useState, useEffect } from "react";
import { useGlobalState } from "../context/LocalState";
import Switch from "../components/Switch";
import { PLAN_MEALS, DAY_IS_ACTIVE } from "../context/reducers";
import { saveArrayToLocal } from "../static/Helpers";
import MenuAppBar from "../components/MenuAppBar";
import OptionBar from "../components/OptionBar";

export default function CompileMenu() {
  const { options, menuObject, setMenuObject } = useGlobalState();

  useEffect(() => {
    saveArrayToLocal(menuObject, "menu");
  }, [menuObject]);

  function handleSwitch(index) {
    let newVal = !menuObject[index].planDay;
    setMenuObject({ type: DAY_IS_ACTIVE, day: index, bool: newVal });
  }

  const CardConstructor = () => {
    return (
      <div>
        {menuObject.map((meal, index) => {
          let dayState = menuObject[index].planDay;
          return (
            <div className="day-container" key={index}>
              <div className="day-header">
                <Switch
                  isOn={dayState}
                  handleToggle={handleSwitch}
                  index={index}
                />
                <div className="day-title">{meal.dayName}</div>
                <div className="day-date">the {meal.dayOfMonth}</div>
                <div className={dayState ? "day-options" : "hide"}>
                  <div className="day-date">({meal.servings} servings)</div>
                </div>
              </div>

              <div className={dayState ? "compile-card" : "hide"} id={index}>
                <div className="recipe-title">{meal.title}</div>
                <div className="recipe-subtitle">{meal.subtitle}</div>
                <div className="recipe-description">{meal.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const isMenuStored = () => {
    if (!(menuObject.length > 0)) shuffle();
  };

  const shuffle = () => {
    setMenuObject({
      type: PLAN_MEALS,
      numberOfMeals: options.days,
      startDate: options.startDate,
      servings: options.servings
    });
  };

  useEffect(() => {
    isMenuStored();
  }, []);

  return (
    <Fragment>
      <MenuAppBar title={"Mealizer"} />
      <OptionBar shuffle={shuffle} />
      <CardConstructor />
    </Fragment>
  );
}
