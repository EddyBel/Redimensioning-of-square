import React, { useEffect, useState } from "react";
import { Button, Moveables, Spinner, ListItems } from "./components/index";
import { randomArrayElement, createId } from "./utils/functions";
import {
  COLORS,
  POSITION_AND_SIZE,
  PROPERTY_IMG,
  PROPERTY_AUTHOR,
  PROPERTY_LINK,
} from "./web.config";
import { useImages, useMoveables } from "./hooks/useContexts";

export default function App() {
  /** Global context of the images */
  const { images } = useImages();
  const { moveables, addMoveable, cleanMoveables, addMoveState } =
    useMoveables();

  /** In this state, the parent element that will be used to delimit the dimensions to be used will be saved. */
  const [parent, setParent] = useState();
  const [parentSize, setParentSize] = useState();

  /** Adds an element to the container
   * @returns {void} The function returns nothing
   */
  const addComponent = () => {
    /** Get an element of random array */
    const dataImg = randomArrayElement(images);

    // Extract all the properties that the moveable component will have
    const MoveableObject = {
      id: createId(),
      color: randomArrayElement(COLORS),
      left: POSITION_AND_SIZE.left,
      top: POSITION_AND_SIZE.top,
      width: POSITION_AND_SIZE.width,
      height: POSITION_AND_SIZE.height,
      img: !images ? null : dataImg[PROPERTY_IMG],
      author: !images ? null : dataImg[PROPERTY_AUTHOR],
      link: !images ? null : dataImg[PROPERTY_LINK],
    };

    // Adds the properties of moveables
    addMoveable(MoveableObject);

    // Adds the move properties
    const moveProperties = {
      width: 10,
      height: 10,
      translate: [10, 10],
    };
    addMoveState(moveProperties, MoveableObject.id);
  };

  /** Once the component has been loaded then obtain the parent element, this will serve to measure the maximum dimensions that the element can move. */
  useEffect(() => {
    const parentElement = document.getElementById("parent");
    setParent(parentElement);
    setParentSize({
      width: parentElement.clientWidth,
      height: parentElement.clientHeight,
    });
    parentElement.addEventListener("resize", () => {
      setParentSize({
        width: parentElement.clientWidth,
        height: parentElement.clientHeight,
      });
    });
  }, []);

  return (
    <main className="App">
      <div className="container-draw-space">
        <div className="app__container__buttons">
          <Button onClick={addComponent}>Add Moveable</Button>
          <Button onClick={cleanMoveables}>Remove Moveable</Button>
        </div>
        <div id="parent">
          {!images ? (
            <Spinner />
          ) : !parent ? (
            "loading ..."
          ) : (
            <Moveables
              elements={moveables}
              maxRight={parentSize.width}
              maxBottom={parentSize.height}
            />
          )}
        </div>
      </div>
      <ListItems />
    </main>
  );
}
