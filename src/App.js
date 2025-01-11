import logo from "./logo.svg";
import "./App.css";
import GardenInput from "./GardenInput/GardenInput";
import Header from "./Header/Header";
import Gardens from "./Gardens/Gardens";
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [myGardens, setMyGardens] = useState({
    name: "Test Garden",
    plants: [
      {
        id: 1,
        name: "Tomato",
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
        description: "A popular vegetable that thrives in full sun.",
      },
      {
        id: 2,
        name: "Carrot",
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/e/e6/Carrots.JPG",

        description: "A root vegetable that grows well in loamy soil.",
      },
    ],
  });

  const goToGarden = () => {
    navigate("/mygarden");
  };

  return (
    <div>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <button onClick={goToGarden} className="my-garden-button">
                My Garden
              </button>{" "}
              <GardenInput />
            </>
          }
        />
        <Route path="/mygarden" element={<Gardens gardens={myGardens} />} />
      </Routes>
    </div>
  );
}

export default App;
