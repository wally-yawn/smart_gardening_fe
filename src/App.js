import logo from "./logo.svg";
import "./App.css";
import GardenInput from "./GardenInput/GardenInput";
import Header from "./Header/Header";
//import GardensContainer from "./GardensContainer/GardensContainer";
import Gardens from "./Gardens/Gardens";
//import Plants from "./Plants/Plants";
import React, { useState } from "react";

function App() {
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

  return (
    <div>
      <Header />
      <GardenInput />
      <Gardens gardens={myGardens} />
    </div>
  );
}

export default App;
