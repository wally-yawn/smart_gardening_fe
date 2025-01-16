import React from "react";
import "./Plants.css";
import SavePlant from "../SavePlant/SavePlant";
import { useLocation } from "react-router-dom";
function Plants({ id, name, image, description, deletePlant }) {
  const location = useLocation();
  const handleDelete = () => {
    deletePlant(id);
  };
  return (
    <div className="plant-card">
      <h3>{name}</h3>
      <img src={image} alt={name} className="plant-image" />
      <p>{description}</p>
      {location.pathname === "/" && (
        <SavePlant name={name} img_url={image} description={description} />
      )}
              {deletePlant && (
          <button onClick={handleDelete}>Delete Plant</button>
        )}
    </div>
  );
}
export default Plants;
