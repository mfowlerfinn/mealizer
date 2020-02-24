import React from 'react'
import { useGlobalState } from "../context/LocalState";


export const RecipeTypeSelector = ({ setOutput }) => {

  const {
    RECIPETYPES,
    RECIPECODES
  } = useGlobalState();
    
  return (
      <select name="type" id="recipe-type-select" onChange = {(e) => setOutput(e.target.value)}>
      {/* <option value="">--Please choose an option--</option> */}
      {RECIPECODES.map((code, index) => {
        return <option key={index} value={code} >{RECIPETYPES[index]}</option>;
      })}
      </select>
  )
}
