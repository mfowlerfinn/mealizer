import React from "react";

export const ProcedureLine = Obj => {

  return (
    <div className="recipe-instructions"> {}
      <div className="ingredient-pieces" >{Obj[0]}</div>
      <div className="ingredient-pieces" >{Obj[1]}</div>
    </div>
  );
};
