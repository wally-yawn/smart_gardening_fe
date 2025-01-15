import React from "react";
import "./Gardens.css";
import Plants from "../Plants/Plants";

function Gardens({ gardens }) {
  const allPlants = gardens.plants.map((plant) => {
    return (
      <Plants
        id={plant.id}
        key={plant.id}
        name={plant.name}
        image={plant.img_url}
        description={plant.description}
      />
    );
  });

  return (
    <div>
      <section className="my-garden-page">
        <h2 class="garden-name">{gardens.name}</h2>
        <div class="all-plant-cards">{allPlants}</div>
      </section>
    </div>
  );
}

export default Gardens;