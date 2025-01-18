import React, { useState } from "react";
import "./SavePlant.css";
import config from "../config/config";

function SavePlant({ name, img_url, description, fetchGardenPlants }) {
  const [buttonText, setButtonText] = useState("Save Plant");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState("");
  const plantData = {
    name: name,
    img_url: img_url,
    description: description,
  };
  const handlePlant = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/${config.gardenId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });

      if (response.ok) {
        setButtonText("Plant Saved");
        setButtonDisabled(true);
        fetchGardenPlants();
      } else {
        const errorData = await response.json();
        setError("Failed to save plant, please try again.");
        setButtonText("Error Try Again Later");
      }
    } catch (error) {
      setError("Network error. Please check your connection.");
      setButtonText("Network Error");
    }
  };
  return (
    <div>
      <button
        disabled={buttonDisabled}
        aria-labelledby={"Save Plant"}
        className={buttonDisabled ? "button-disabled" : "button-enabled"}
        onClick={handlePlant}
      >
        {buttonText}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SavePlant;
