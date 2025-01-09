import './GardenInput.css';
import React, { useState } from 'react';

function GardenInput() {
  const [gardenInfo, setGardenInfo] = useState({
    name: '',
    zipcode: '',
    sunlight: '',
    soil_type: '',
    water_needs: '',
    purpose: '',
  });

  return (
    <section class="garden-form-section">
      <h1>Input Garden Info</h1>
      <form class="garden-form">
        <div class="form-row">

        <label>
            Garden Name:
            <input
              type="text"
              placeholder="Garden Name"
              value={gardenInfo.name}
            />
          </label>
          <br />
          <label>
            Soil Type:
            <input 
            type="text"
            placeholder="Soil Type"
            value={gardenInfo.soil_type}
            />
          </label>
          <br/>
          <label>
            Zipcode:
            <input
              type="text"
              placeholder="Zip Code"
              value={gardenInfo.zipcode}
            />
          </label>
        </div>
          <br />
        <div class="form-row">

          <label>
            Sunlight:
            <input
              type="text"
              placeholder="Sunlight"
              value={gardenInfo.sunlight}
            />
          </label>
          <br />
          <label>
            Water Needs:
            <input
              type="text"
              placeholder="Water Needs"
              value={gardenInfo.water_needs}
            />
          </label>
          <br />
          <label>
            Purpose:
            <input
              type="text"
              placeholder="Purpose"
              value={gardenInfo.purpose}
            />
          </label>
          <br />
        </div>
          <button type="submit">Search</button>
      </form>
    </section>
    
  );
};

export default GardenInput