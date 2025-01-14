import React from "react";
import "./Plants.css";
import SavePlant from "../SavePlant/SavePlant";

function Plants({ id, name, image, description }) {
  console.log("Test", name);
  return (
    <div className="plant-card">
      <h3>{name}</h3>
      <img src={image} alt={name} className="plant-image" />
      <p>{description}</p>
      <SavePlant name={name} img_url={image} description={description} />
    </div>
  );
}

export default Plants;
