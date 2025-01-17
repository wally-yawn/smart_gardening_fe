import React, { useState, useEffect } from "react";
import "./Gardens.css";
import Plants from "../Plants/Plants";
import config from "../config/config";

function Gardens({ gardens, fetchGardenPlants }) {
  const [allPlants, setAllPlants] = useState(gardens.plants);

  useEffect(() => {
    setAllPlants(gardens.plants);
  }, [gardens]);
  const removePlant = async (plantId) => {
    try {
      const response = await fetch(`${config.baseUrl}/gardens/1/plants/${plantId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAllPlants(allPlants.filter((plant) => plant.id !== plantId));
        fetchGardenPlants();
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
        name={plant.attributes.name}
        image={plant.attributes.img_url}
        description={plant.attributes.description}
        deletePlant={removePlant}
        fetchGardenPlants={fetchGardenPlants}
      />
    );
  });

  return (
    <div>
      <section className="my-garden-page">
        <h2 className="garden-name">{gardens.name}</h2>
        <div className="all-plant-cards">
          {allPlants.length === 0 ? <p>No Plants Saved Yet</p> : plantCards}
        </div>
      </section>
    </div>
  );
}

export default Gardens;
