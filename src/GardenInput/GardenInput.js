import "./GardenInput.css";
import React, { useState, useEffect } from "react";
import config from '../config/config';
import { Tooltip } from "react-tooltip";

function GardenInput({ gardenId, setRecommendations }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [gardenInfo, setGardenInfo] = useState({
    name: "",
    zip_code: "",
    sunlight: "",
    soil_type: "",
    water_needs: "",
    purpose: "",
  });
  const [hasGarden, setHasGarden] = useState(false);

  useEffect(() => {
    const fetchGarden = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/gardens/${config.gardenId}`);
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
          setHasGarden(true);
        } else {
          throw new Error("Oh no, something went wrong fetching your garden, try again in a few minutes")
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGarden();
  }, []);

  const isZipValid = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

  const areDropdownsValid = (
      gardenInfo.name &&
      gardenInfo.sunlight &&
      gardenInfo.soil_type &&
      gardenInfo.water_needs &&
      gardenInfo.purpose
    ) || false;

  const isSearchEnabled = isZipValid(gardenInfo.zip_code) && areDropdownsValid;
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGardenInfo({
      ...gardenInfo,
      [name]: value || "",
    });
  };

  function searchRecommendations(e){
    e.preventDefault();
    if (!isSearchEnabled) {
      setError("Please complete all fields before searching.")
      return;
    }

    setError(null);
    setSuccessMessage("Searching for recommendations...");
    setTimeout(() => setSuccessMessage(null), 5000);
    const params = {
      zip_code: gardenInfo.zip_code,
      sunlight: gardenInfo.sunlight,
      soil_type: gardenInfo.soil_type,
      water_needs: gardenInfo.water_needs,
      purpose: gardenInfo.purpose,
    };

    fetch(`${config.baseUrl}/recommendation?` + new URLSearchParams(params), {
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
        setSuccessMessage("Recommendations fetched successfully.");
        setTimeout(() => setSuccessMessage(null), 5000);
      })
      .catch((error) => setError(error.message));
  }

  const handleSaveOrEdit = async (event) => {
    event.preventDefault();
    if (!isSearchEnabled) {
      setError("Please complete all fields before saving or updating.")
      return;
    }
    try {
      const method = hasGarden ? "PATCH" : "POST";
      const saveUrl = hasGarden
      ? `${config.baseUrl}/gardens/${config.gardenId}`
      : `${config.baseUrl}/gardens`;

      const response = await fetch(saveUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ garden: gardenInfo }),
      });

      if(response.ok) {
        await response.json();
        setHasGarden(true);
        setSuccessMessage("Garden saved/updated successfully.");
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setError("Failed to save/update garden.");
      }
    } catch (error) {
      console.error("Failed to save/update garden", error.message)
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <section className="garden-form-section">
      <span 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Please enter a valid 5-digit zip code and select your options from the drop down menus."
      >
        <a className="info-icon">  ℹ️</a>
      </span>
      <Tooltip id="my-tooltip" />
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
        <button className='search-button' aria-labelledby="Submit" type="submit" onClick={searchRecommendations}>Search</button>
        <button className='edit-save-button' aria-labelledby="Save/Update" type="button" onClick={handleSaveOrEdit}>{hasGarden ? "Update" : "Save"}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </section>
  );
}

export default GardenInput;
