import React from "react";
import "./Plants.css";
import SavePlant from "../SavePlant/SavePlant";
import { useLocation } from "react-router-dom";

function Plants({ id, name, image, description }) {
  const location = useLocation();

  return (
    <div className="plant-card">
      <h3>{name}</h3>
      <img src={image} alt={name} className="plant-image" />
      <p>{description}</p>
      {location.pathname === "/" && (
        <SavePlant name={name} imgage={image} description={description} />
      )}
    </div>
  );
}

export default Plants;
