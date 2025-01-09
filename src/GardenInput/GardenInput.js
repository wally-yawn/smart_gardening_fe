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
    <section>
      <h1>Input Garden Info</h1>
      <form>
      <label>
          Garden Name:
          <input
            type="text"
            value={gardenInfo.name}
          />
        </label>
        <br />
        <label>
          Soil Type:
          <input 
          type="text"
          value={gardenInfo.soil_type}
          />
        </label>
        <br/>
        <label>
          Zipcode:
          <input
            type="text"
            value={gardenInfo.zipcode}
          />
        </label>
        <br />
        <label>
          Sunlight:
          <input
            type="text"
            value={gardenInfo.sunlight}
          />
        </label>
        <br />
        <label>
          Water Needs:
          <input
            type="text"
            value={gardenInfo.water_needs}
          />
        </label>
        <br />
        <label>
          Purpose:
          <input
            type="text"
            value={gardenInfo.purpose}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
    
  );
};

export default GardenInput