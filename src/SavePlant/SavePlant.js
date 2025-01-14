import React, { useState } from "react";
import "./SavePlant.css";

function SavePlant({ name, img_url, description }) {
  const [buttonText, setButtonText] = useState("Save Plant");
  const plantData = {
    name: name,
    // img_url: img_url,
    description: description,
  };
  const handlePlant = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });

      if (response.ok) {
        console.log("Plant saved successfully");
        setButtonText("Plant Saved");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        setButtonText("Error Try Again Later");
      }
    } catch (error) {
      console.error("Error saving plant:", error);
    }
  };
  return <button onClick={handlePlant}>{buttonText}</button>;
}

export default SavePlant;
