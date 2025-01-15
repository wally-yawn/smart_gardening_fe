
  import React from "react";
  import "./Plants.css";
  
  function Plants({ id, name, image, description, deletePlant }) {
    console.log("Test", name);
    const handleDelete = () => {
      deletePlant(id);
    }
    return (
      <div className="plant-card">
        <h3>{name}</h3>
        <img src={image} alt={name} className="plant-image" />
        <p>{description}</p>
        {deletePlant && (
          <button onClick={handleDelete}>Delete Plant</button>
        )}
      </div>
    );
  }
  
  export default Plants;