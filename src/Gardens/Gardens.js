import React, { useState, useEffect } from "react";
import "./Gardens.css";
import Plants from "../Plants/Plants";
import config from "../config/config";

function Gardens({ gardens, fetchGardenPlants }) {
  const [allPlants, setAllPlants] = useState(gardens?.plants || []);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (gardens?.plants) {
      setAllPlants(gardens.plants);
    }
  }, [gardens]);

  const removePlant = async (plantId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${config.baseUrl}/gardens/${config.gardenId}/plants/${plantId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setAllPlants(allPlants.filter((plant) => plant.id !== plantId));
        fetchGardenPlants();
      } else {
        setError("Failed to delete plant. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!gardens) {
    return <div>No garden data available</div>;
  }

  return (
    <div>
      <section className="my-garden-page" data-testid="garden-section">
        <h2 className="garden-name">{gardens.name}</h2>
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}
        {isLoading && (
          <div className="loading" data-testid="loading">
            Loading...
          </div>
        )}
        <div className="all-plant-cards">
          {allPlants.length === 0 ? (
            <p data-testid="empty-garden">No Plants Saved Yet</p>
          ) : (
            allPlants.map((plant) => (
              <Plants
                key={plant.id}
                id={plant.id}
                name={plant.attributes.name}
                image={plant.attributes.img_url}
                description={plant.attributes.description}
                deletePlant={removePlant}
                fetchGardenPlants={fetchGardenPlants}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Gardens;
