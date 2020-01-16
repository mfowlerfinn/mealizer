import React from "react";
import "./switch.css";

export default function Switch({ isOn, handleToggle, index }) {
  return (
    <>
      <div className="switch">
        <input
          type="checkbox"
          checked={isOn}
          name={`${index}`}
        />
        <span
          onClick={() => handleToggle(index)}
          className="slider round"
        ></span>
      </div>
    </>
  );
}
