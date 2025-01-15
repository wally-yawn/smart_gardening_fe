import "./RecommendationContainer.css";
import React, { useState, useEffect} from "react";
import Plants from "../Plants/Plants";

function RecommendationContainer({ plantRecommendations }){
  let allPlants;

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
    allPlants = null;
  }

console.log('plantrecommendation: ', plantRecommendations.data)

  return (
    <section className="recommendations-container"> 
    <h2 className="recommendations-headers"> Recommendations </h2>
    {allPlants === null ? (
      <p className="default-messsage">Enter your garden information and click Search to get recommendations!</p>
    ) : (
      <div className="all-plant-cards">{allPlants}</div>
    )}
  </section>
  )
}

export default RecommendationContainer;