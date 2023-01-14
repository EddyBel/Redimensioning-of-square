import { useState } from "react";
import Moveable from "react-moveable";

/**
 * Component to be resized, which can be a div or an image.
 * @param {string} img - Url of the image to render
 * @param {string} color - If the element is a div, it will have a random color.
 * @param {number} id - Id of the element to render
 * @param {number} top - Position of the top element
 * @param {number} left - Poicion of the element left
 * @param {number} width - Width of the element to be rendered
 * @param {number} height - Height of the element to be rendered
 * @param {boolean} error - Indicates if there was an error in the image request
 * @param {number} limitBottom - Lower limit to which the element can be displaced
 * @param {number} limitRight - Horizontal limit to where the element can be displaced
 * @returns - Component to resize moveable
 */
export function MoveableComponent({
  img,
  color,
  id,
  top,
  left,
  width,
  height,
  error,
  limitBottom,
  limitRight,
}) {
  /** State controlling the element the selection of the element to be used */
  const [target, setTarget] = useState();
  /** State controlling the size and position of the element */
  const [nodoReferencia, setNodoReferencia] = useState({
    width: 0,
    height: 0,
    translate: [10, 10],
  });

  /**
   * Function that selects the element to be modified
   * @param {Element} target - Element to be modified
   * @returns {void} - Function returns nothing
   */
  const selectMoveable = (target) => setTarget(target);

  /**
   * Updates the position of the element, shifts the element
   * @param {Element} target - Element to be modified
   * @param {number[]} beforeTranslate - New position of the element
   * @returns {void} - Function return nothing
   */
  const updateMoveable = ({ target, beforeTranslate }) => {
    let frames = Object.assign(nodoReferencia);
    setNodoReferencia(frames);
    frames.translate = [...beforeTranslate];
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
    let frames = Object.assign(nodoReferencia);
    frames.width = width;
    frames.height = height;
    setNodoReferencia(frames);
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
    dragStart && dragStart.set(nodoReferencia.translate);
  };

  return (
    <>
      {error ? (
        <div
          onClick={(e) => selectMoveable(e.target)}
          id={`component-${id}`}
          className="moveable__component"
          style={{
            position: "absolute",
            borderRadius: "12px",
            width: width,
            height: height,
            top: top,
            left: left,
            background: color,
          }}
        ></div>
      ) : (
        <img
          onClick={(e) => selectMoveable(e.target)}
          className="moveable__component"
          id={`component-${id}`}
          alt={`component-${id}`}
          src={img}
          style={{
            position: "absolute",
            borderRadius: "12px",
            width: width,
            height: height,
            top: top,
            left: left,
          }}
        />
      )}
      <Moveable
        target={target}
        dragTarget={target}
        draggable={true}
        resizable={true}
        throttleResize={0}
        throttleDrag={0}
        snappable={true}
        bounds={{ left: 0, top: 0, right: limitRight, bottom: limitBottom }}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => set(nodoReferencia.translate)}
        onDrag={updateMoveable}
        onResizeStart={onResizeStart}
        onResize={onResize}
      />
    </>
  );
}
