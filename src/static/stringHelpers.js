import { parse } from "recipe-ingredient-parser-v2";
const convert = require("convert-units");

export const stringToObj = str => {
  let obj = parse(str);
  obj.unit = obj.unit === "teaspoon" ? "tsp" : obj.unit;
  obj.unit = obj.unit === "tablespoon" ? "Tbs" : obj.unit;
  obj.unit = obj.unit === "pint" ? "pt" : obj.unit;
  obj.unit = obj.unit === "quart" ? "qt" : obj.unit;

  if (obj.ingredient.slice(0, 3) === "egg") obj.ingredient = "egg";

  try {
    if (obj.unit) {
      //what type of measurement is it (mass or volume)?
      //what are we trying to convert to?
      let unit = "ml";
      let num = convert(obj.quantity)
        .from(obj.unit)
        .to(unit);
      num = Math.round(num);
      //console.log(num);
      //console.log(`converted ${obj.quantity} ${obj.unit} to ${num} ${unit}`)
      obj.unit = unit;
      obj.quantity = num;
    }
  } catch (error) {
    console.error(`could not convert ${obj.quantity} ${obj.unit}`);
  }

  return obj;
};

function getCommonCookingFraction(value) {
  if (value < 0.05) {
    return "0";
  } else if (value < 0.188) {
    return "1/8";
  } else if (value < 0.292) {
    return "1/4";
  } else if (value < 0.417) {
    return "1/3";
  } else if (value < 0.584) {
    return "1/2";
  } else if (value < 0.71) {
    return "2/3";
  } else if (value < 0.92) {
    return "3/4";
  } else {
    return "1";
  }
}
