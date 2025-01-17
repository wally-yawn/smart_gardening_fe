import React, { useState } from "react";
import "./SavePlant.css";
import config from "../config/config";

function SavePlant({ name, img_url, description, fetchGardenPlants }) {
  const [buttonText, setButtonText] = useState("Save Plant");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const plantData = {
    name: name,
    img_url: img_url,
    description: description,
  };
  const handlePlant = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/1`, {
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
        console.error("Error:", errorData.message);
        setButtonText("Error Try Again Later");
      }
    } catch (error) {
      console.error("Error saving plant:", error);
    }
  };
  return <button disabled={buttonDisabled} className={buttonDisabled ? "button-disabled" : "button-enabled"} onClick={handlePlant}>{buttonText}</button>;
}

export default SavePlant;
