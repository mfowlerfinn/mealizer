import React from 'react'
import { useGlobalState } from "../context/LocalState";


export const RecipeTypeSelector = ({ setOutput }) => {

  const {
    options,
    setOptions,
    menuObject,
    setMenuObject,
    RECIPETYPES,
    RECIPECODES
  } = useGlobalState();
    
  return (
      <select name="type" id="recipe-type-select" onChange = {(e) => setOutput(e.target.value)}>
      {/* <option value="">--Please choose an option--</option> */}
      {RECIPECODES.map((code, index) => {
        let selector = (index < 1) ? "selected" : "";
        return <option key={index} value={code} >{RECIPETYPES[index]}</option>;
      })}
      </select>
  )
}
