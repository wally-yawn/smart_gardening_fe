import React from "react";
import "./Plants.css";

function Plants({ id, name, image, description }) {
  console.log("Test", name);
  return (
    <div className="plant-card">
      <h3>{name}</h3>
      <img src={image} alt={name} className="plant-image" />
      <p>{description}</p>
    </div>
  );
}

export default Plants;
