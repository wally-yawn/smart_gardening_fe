import "./GardenInput.css";
import React, { useState, useEffect } from "react";

function GardenInput({ gardenId }) {
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
          setHasGarden(true);
        } else if (response.status === 404) {
          console.log("No garden found");
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData= new FormData(event.target);
    const action = formData.get("action");

    if (action === "search") {
      console.log("Search for garden");
      return;
    }

    try {
      const method = hasGarden ? "PATCH" : "POST";
      const url = hasGarden
        ? `http://localhost:3000/api/v1/gardens/1`
        : `http://localhost:3000/api/v1/gardens`;

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ garden: gardenInfo }),
      });

      if (response.ok) {
        const gardenData = await response.json();
        setHasGarden(true);
        console.log("Garden data saved", gardenData);
      }
    } catch (error) {
      console.error("Failed to save garden data", error.message);
    }
  };

  return (
    <section className="garden-form-section">
      <h1>Input Garden Info</h1>
      <form className="garden-form" onSubmit={handleSubmit}>
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
        <button type="submit" name="action" value="search">
          Search
        </button>
        <button type="submit" name="action" value="save">
          {hasGarden ? "Edit" : "Save"}
        </button>
      </form>
    </section>
  );
}

export default GardenInput;
