import "./GardenInput.css";
import React, { useState , useEffect } from "react";

function GardenInput( { gardenId }) {
  const [gardenInfo, setGardenInfo] = useState({
    name: "",
    zipcode: "",
    sunlight: "",
    soil_type: "",
    water_needs: "",
    purpose: "",
  });

  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const response = await fetch(`/gardens/$gardenId`);
        if (response.ok) {
          const gardenData = await response.json();
          setGardenInfo(gardenData);
        } else {
          console.error("Failed to fetch garden data", response.status);
        }
      };

      fetchGarden();
    }, [gardenId]);



  return (
    <section class="garden-form-section">
      <h1>Input Garden Info</h1>
      <form class="garden-form">
        <div class="form-row">
          <label>
            Zipcode:
            <input
              type="text"
              placeholder="Zip Code"
              value={gardenInfo.zipcode}
            />
          </label>

          <label>
            Garden Name:
            <select name="name" value={gardenInfo.name}>
              <option value="">Select a Garden Name</option>
              <option value="Herb Garden">Herb Garden</option>
              <option value="Vegetable Garden">Vegetable Garden</option>
              <option value="Flower Garden">Flower Garden</option>
              <option value="Mixed Garden">Mixed Garden</option>
            </select>
          </label>

          <label>
            Soil Type:
            <select name="soil_type" value={gardenInfo.soil_type}>
              <option value="">Select Soil Type</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
              <option value="Peaty">Peaty</option>
              <option value="Silty">Silty</option>
              <option value="Chalky">Chalky</option>
            </select>
          </label>
        </div>

        <div class="form-row">
          <label>
            Sunlight:
            <select name="sunlight" value={gardenInfo.sunlight}>
              <option value="">Select Sunlight</option>
              <option value="Full Sun">Full Sun</option>
              <option value="Partial Sun">Partial Sun</option>
              <option value="Shade">Shade</option>
            </select>
          </label>

          <label>
            Water Needs:
            <select name="water_needs" value={gardenInfo.water_needs}>
              <option value="">Select Water Needs</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </label>

          <label>
            Purpose:
            <select name="purpose" value={gardenInfo.purpose}>
              <option value="">Select Purpose</option>
              <option value="Aesthetic">Aesthetic</option>
              <option value="Food Production">Food Production</option>
              <option value="Medicinal">Medicinal</option>
              <option value="Recreation">Recreation</option>
            </select>
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default GardenInput;
