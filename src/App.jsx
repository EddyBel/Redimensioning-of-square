import React from "react";
import { Button, MoveableComponent, Spinner } from "./components/index";
import { randomArrayElement, createId } from "./utils/functions";
import { COLORS, POSITION_AND_SIZE } from "./web.config";
import { useImages, useMoveables } from "./hooks/useContexts";

export default function App() {
  /** Global context of the images */
  const { images, error } = useImages();
  const { moveables, addMoveable, cleanMoveables } = useMoveables();

  /** Adds an element to the container
   * @returns {void} The function returns nothing
   */
  const addComponent = () => {
    // Get the parent element given its id
    const parent = document.getElementById("parent");

    // Extract all the properties that the moveable component will have
    const MoveableObject = {
      id: createId(),
      color: randomArrayElement(COLORS),
      left: POSITION_AND_SIZE.left,
      top: POSITION_AND_SIZE.top,
      width: POSITION_AND_SIZE.width,
      height: POSITION_AND_SIZE.height,
      limitBottom: parent.clientHeight,
      limitRight: parent.clientWidth,
      img: !images ? null : randomArrayElement(images).url,
      error: error,
    };

    // Adds the properties of moveables
    addMoveable(MoveableObject);
  };

  return (
    <main className="App">
      <div className="app__container__buttons">
        <Button onClick={addComponent}>Add Moveable</Button>
        <Button onClick={cleanMoveables}>Remove Moveable</Button>
      </div>
      <div id="parent">
        {!images ? (
          <Spinner key="Spinner-loading-images" />
        ) : (
          moveables.map((item, index) => (
            <MoveableComponent {...item} key={index} />
          ))
        )}
      </div>
    </main>
  );
}
