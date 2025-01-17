import logo from "./logo.svg";
import "./App.css";
import GardenInput from "./GardenInput/GardenInput";
import Header from "./Header/Header";
import Gardens from "./Gardens/Gardens";
import RecommendationContainer from "./RecommendationContainer/RecommendationContainer";
import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import config from "./config/config";

function App() {
  const [myGardens, setMyGardens] = useState({
    name: "My Garden",
    plants: [],
  });

  const [recommendations, setRecommendations] = useState({
    plants: [],
  });

  const fetchGardenPlants = async () => {
    try {
      var debugurl = `${config.baseUrl}/${config.gardenId}/plants`
      console.log('config.baseurl: ', config.baseUrl)
      const response = await fetch(`${config.baseUrl}/${config.gardenId}/plants`);
      if (response.ok) {
        const data = await response.json();
        setMyGardens((prevGardens) => ({
          ...prevGardens,
          plants: data.data,
        }));
      } else {
        console.error("Failed to fetch your garden's plants");
      }
    } catch (error) {
      console.error("Error fetching plants", error);
    }
  };

  useEffect(() => {
    fetchGardenPlants();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Link to="/mygarden">
                <button className="my-garden-button">My Garden</button>
              </Link>
              <GardenInput
                key={"gardenInput"}
                setRecommendations={setRecommendations}
              />
              <RecommendationContainer
                key={"recommendation-container"}
                plantRecommendations={recommendations}
                fetchGardenPlants={fetchGardenPlants}
              />
            </>
          }
        />
        <Route
          path="/mygarden"
          element={
            <Gardens
              gardens={myGardens}
              fetchGardenPlants={fetchGardenPlants}
            />
          }
        />
        <Route path="*" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
