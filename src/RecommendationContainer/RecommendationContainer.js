import "./RecommendationContainer.css";
import React from "react";
import Plants from "../Plants/Plants";

function RecommendationContainer({ plantRecommendations }){

  let allPlants; // Declare `allPlants` in a wider scope

  if (plantRecommendations?.data?.length > 0) {
    console.log('recommendations: ', plantRecommendations)
    console.log('data: ', plantRecommendations.data)
    console.log('data[0]: ', plantRecommendations.data[0])
    allPlants = plantRecommendations?.data?.map((plant) => {
      return (
        <Plants
          id={plant.index}
          key={plant.index}
          name={plant.attributes.name}
          image={plant.attributes.image}
          description={plant.attributes.description}
        />
      );
    });
  } else {
    allPlants = 'hello';
  }

console.log('plantrecommendation: ', plantRecommendations.data)

  return (
    <section className="recommendations-container"> 
      <h2 class='recommendations-headers'>This is my header </h2>
      <div class="all-plant-cards">{allPlants}</div>
      <h3>plantRecommendations</h3>
    </section>
  )
}

export default RecommendationContainer;