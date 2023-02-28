import { useState, useEffect } from "react";
import { Elements } from "./elements";
import { useMoveables } from "../hooks/useContexts";
import Moveable from "react-moveable";

/** This component maintains the logic of the movements of the elements */
export function Moveables({ elements, maxRight, maxBottom }) {
  /** Global status of all moving components */
  const { nodeReference, setNodeReference } = useMoveables();

  /** Indicates the element to be manipulated */
  const [element, setElement] = useState();
  /** Indicates the id of the element to be manipulated */
  const [targetId, setTargetId] = useState();

  /**
   * Updates the position of the element, shifts the element
   * @param {Element} target - Element to be modified
   * @param {number[]} beforeTranslate - New position of the element
   * @returns {void} - Function return nothing
   */
  const updateMoveable = ({ target, beforeTranslate }) => {
    let frames = Object.assign(nodeReference);
    frames[targetId].translate = [...beforeTranslate];
    setNodeReference(frames);
    target.style.left = `${beforeTranslate[0]}px`;
    target.style.top = `${beforeTranslate[1]}px`;
  };

  /**
   * Function that resizes the element
   * @param {Element} target - Element to be modified
   * @param {number} width - New element width
   * @param {number} height - New element height
   * @return {void} - Function return nothing
   */
  const onResize = ({ target, width, height }) => {
    let frames = Object.assign(nodeReference);
    frames[targetId].width = width;
    frames[targetId].height = height;
    setNodeReference(frames);
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
  };

  /**
   * Function that handles the start of a resize event.
   * @param {Object} e - The event object that contains information about the event.
   * @param {Function} e.setOrigin - A function that sets the origin of the resize event.
   * @param {Object} e.dragStart - An object that contains information about the starting position of the drag event.
   * @param {Array} e.dragStart.set - A function that sets the starting position of the drag event as an array in the form of [x, y].
   * @return {void} - Function return nothing
   */
  const onResizeStart = (e) => {
    let setOrigin = e.setOrigin;
    let dragStart = e.dragStart;
    setOrigin(["%", "%"]);
    dragStart && dragStart.set(nodeReference[targetId].translate);
  };

  /** This snippet measures if the list of elements to render is empty, if so then deselect any element that is selected. */
  useEffect(() => {
    if (elements.length <= 0) setElement(null);
  }, [elements]);

  useEffect(() => {
    // Obtenemos el elemento con el id 'parent'
    const parent = document.getElementById("parent");

    // Agregamos un event listener para el click en todo el documento
    document.addEventListener("click", function (event) {
      // Si el elemento clickeado no es el contenedor 'parent' ni uno de sus hijos
      if (!parent.contains(event.target)) {
        // Aquí puedes ejecutar el código que desees, por ejemplo:
        setElement(null);
      }
    });
  }, []);

  return (
    <>
      <Elements
        elements={elements}
        setElement={setElement}
        setTarget={setTargetId}
      />
      <Moveable
        target={element}
        dragTarget={element}
        draggable={true}
        resizable={true}
        keepRatio={false}
        edge={[
          "top",
          "left",
          "bottom",
          "right",
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
        ]}
        throttleResize={0}
        throttleDrag={0}
        snappable={true}
        bounds={{ left: 0, top: 0, right: maxRight, bottom: maxBottom }}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => set(nodeReference[targetId].translate)}
        onDrag={updateMoveable}
        onResizeStart={onResizeStart}
        onResize={onResize}
      />
    </>
  );
}
