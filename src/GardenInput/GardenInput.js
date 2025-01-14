import "./GardenInput.css";
import React, { useState, useEffect } from "react";

function GardenInput({ gardenId, setRecommendations }) {
  const url = 'http://localhost:3000/api/v1/'
  const [error, setError] = useState(null);

  const [gardenInfo, setGardenInfo] = useState({
    name: "",
    zip_code: "",
    sunlight: "",
    soil_type: "",
    water_needs: "",
    purpose: "",
  });

  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/gardens/1`);
        if (response.ok) {
          const gardenData = await response.json();
          setGardenInfo({
            name: gardenData.name || "",
            zip_code: gardenData.zip_code || "",
            sunlight: gardenData.sunlight || "",
            soil_type: gardenData.soil_type || "",
            water_needs: gardenData.water_needs || "",
            purpose: gardenData.purpose || "",
          });
        } else {
          console.error("Failed to fetch garden data", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch garden data", error.message);
      }
    };

    fetchGarden();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGardenInfo({
      ...gardenInfo,
      [name]: value || "",
    });
  };

  function searchRecommendations(e){
    e.preventDefault();

    console.log("gardenInfo: ", gardenInfo);
    const params = {
      zip_code: gardenInfo.zip_code,
      sunlight: gardenInfo.sunlight,
      soil_type: gardenInfo.soil_type,
      water_needs: gardenInfo.water_needs,
      purpose: gardenInfo.purpose,
    };

    fetch(`${url}/recommendation?/` + new URLSearchParams(params), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to get recommendations');
        }
        return response.json()
      })
      .then((data) => {
        setRecommendations(data)
      })
      .catch((error) => setError(error.message));
  }

  return (
    <section className="garden-form-section">
      <h1>Input Garden Info</h1>
      <form className="garden-form">
        <div className="form-row">
          <label>
            Zipcode:
            <input
              type="text"
              placeholder="Zip Code"
              name="zip_code"
              value={gardenInfo.zip_code || ""}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Garden Name:
            <select
              name="name"
              value={gardenInfo.name || ""}
              onChange={handleInputChange}
            >
              <option value="">Select a Garden Name</option>
              <option value="Herb Garden">Herb Garden</option>
              <option value="Vegetable Garden">Vegetable Garden</option>
              <option value="Flower Garden">Flower Garden</option>
              <option value="Mixed Garden">Mixed Garden</option>
            </select>
          </label>

          <label>
            Soil Type:
            <select
              name="soil_type"
              value={gardenInfo.soil_type || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Soil Type</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
              <option value="Peaty">Peaty</option>
              <option value="Silty">Silty</option>
              <option value="Chalky">Chalky</option>
              <option value="Don't Know">Don't Know</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Sunlight:
            <select
              name="sunlight"
              value={gardenInfo.sunlight || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Sunlight</option>
              <option value="Full Sun">Full Sun</option>
              <option value="Partial Sun">Partial Sun</option>
              <option value="Shade">Shade</option>
              <option value="Don't Know">Don't Know</option>
            </select>
          </label>

          <label>
            Water Needs:
            <select
              name="water_needs"
              value={gardenInfo.water_needs || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Water Needs</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Don't Know">Don't Know</option>
            </select>
          </label>

          <label>
            Purpose:
            <select
              name="purpose"
              value={gardenInfo.purpose || ""}
              onChange={handleInputChange}
            >
              <option value="">Select Purpose</option>
              <option value="Aesthetic">Aesthetic</option>
              <option value="Food Production">Food Production</option>
              <option value="Medicinal">Medicinal</option>
              <option value="Recreation">Recreation</option>
            </select>
          </label>
        </div>
        <button type="submit" onClick={searchRecommendations}>Search</button>
      </form>
    </section>
  );
}

export default GardenInput;
