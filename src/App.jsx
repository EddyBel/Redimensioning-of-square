import React, { useState, useEffect } from "react";
import { Component } from "./components/cards";
import { Spinner } from "./components/spinner";
import { Button } from "./components/button";
import { get_images } from "./services/getImages.api";
import { randomArrayElement, createId } from "./utils/functions";
import { MoveableProps } from "./models/moveable.model";
import { COLORS, POSITION_AND_SIZE } from "./web.config";

export default function App() {
  // States related to the collection of images
  const [imagesAPI, setImagesAPI] = useState();
  const [errorImagesApi, setErrorImagesApi] = useState(false);

  // States related to moveables
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [lastMoveable, setLastMoveable] = useState();

  /** Adds an element to the container */
  const addMoveable = () => {
    const parent = document.getElementById("parent");

    let id = createId();
    let color = randomArrayElement(COLORS);
    let image = !imagesAPI ? null : randomArrayElement(imagesAPI).url;
    let left = POSITION_AND_SIZE.left;
    let top = POSITION_AND_SIZE.top;
    let width = POSITION_AND_SIZE.width;
    let height = POSITION_AND_SIZE.height;
    let error = errorImagesApi;
    let limitBottom = parent.clientHeight;
    let limitRight = parent.clientWidth;

    const moveableProps = new MoveableProps(
      id,
      color,
      image,
      error,
      width,
      height,
      left,
      top,
      limitBottom,
      limitRight
    );

    setLastMoveable([lastMoveable]);
    setMoveableComponents([...moveableComponents, moveableProps]);
  };

  /** Removes all items from the container  */
  const removeMoveable = () => {
    setMoveableComponents([]);
  };

  /** State that controls image requests  */
  useEffect(() => {
    get_images()
      .then((response) => {
        setImagesAPI(response);
        setErrorImagesApi(false);
      })
      .catch(setErrorImagesApi(true));
  }, []);

  return (
    <main className="App">
      <div className="app__container__buttons">
        <Button onClick={addMoveable}>Add Moveable</Button>
        <Button onClick={removeMoveable}>Remove Moveable</Button>
      </div>
      <div id="parent">
        {!imagesAPI ? (
          <Spinner />
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
              imagen={item.img}
              limitBottom={item.limitBottom}
              limitRight={item.limitRight}
            />
          ))
        )}
      </div>
    </main>
  );
}
