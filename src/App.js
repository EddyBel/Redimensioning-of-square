import React, { useRef, useState, useEffect } from "react";
import { Component } from "./components/cards";
import { get_images } from "./services/getImages.api";

export default function App() {
  const [imagesAPI, setImagesAPI] = useState([]);
  const [errorImagesApi, setErrorImagesApi] = useState();
  const [moveableComponents, setMoveableComponents] = useState([]);

  const addMoveable = () => {
    if (!imagesAPI || errorImagesApi == "Error Server") return;
    const COLORS = ["red", "blue", "yellow", "green", "purple"];

    setMoveableComponents([
      ...moveableComponents,
      {
        id: Math.floor(Math.random() * Date.now()),
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        error: !errorImagesApi ? false : true,
        updateEnd: true,
      },
    ]);
  };

  useEffect(() => {
    get_images()
      .then((response) => setImagesAPI(response))
      .catch(setErrorImagesApi("Error Server"));
  }, []);

  useEffect(() => {
    const button = document.getElementById("button__add_moveable1");
    button.addEventListener("click", () => addMoveable());
  }, []);

  return (
    <main className="App">
      <button className="app__button__add" id="button__add_moveable1">
        Add Moveable1
      </button>
      <div id="parent">
        {!imagesAPI ? (
          "Loading"
        ) : !moveableComponents ? (
          <></>
        ) : (
          moveableComponents.map((item, index) => (
            <Component
              {...item}
              key={index}
              id={index}
              left={item.left}
              top={item.top}
              color={item.color}
              err={item.error}
              imagen={imagesAPI[index].url}
            />
          ))
        )}
      </div>
    </main>
  );
}
