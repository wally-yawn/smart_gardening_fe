import React, { useState, useEffect } from "react";import "./Gardens.css";
import Plants from "../Plants/Plants";
import BASE_URL from '../config/config';

function Gardens({ gardens }) {
  const [allPlants, setAllPlants] = useState(gardens.plants);

  const testPlants = [
    { id: 1, name: "Tomato", img_url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg", description: "A popular vegetable that thrives in full sun." },
    { id: 2, name: "Carrot", img_url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Carrots.JPG", description: "A root vegetable that grows well in loamy soil." },
  ];

  useEffect(() => {
    setAllPlants(testPlants);
  }, []);

  const removePlant = async (plantId) => {
    try {
      const response = await fetch(`${BASE_URL}/garden/${gardens.id}/plant/${plantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAllPlants(allPlants.filter((plant) => plant.id !== plantId));
        console.log(`Plant deleted successfully.`);
      } else {
        console.error(`Failed to delete plant`);
      }
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };
  const plantCards = allPlants.map((plant) => {
    return (
      <Plants
        id={plant.id}
        key={plant.id}
        name={plant.name}
        image={plant.img_url}
        description={plant.description}
        deletePlant={removePlant}  
      />
    );
  });

  return (
    <div>
      <section className="my-garden-page">
        <h2 className="garden-name">{gardens.name}</h2>
        <div className="all-plant-cards">{plantCards}</div>
      </section>
    </div>
  );
}

export default Gardens;