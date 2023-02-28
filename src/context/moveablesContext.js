/** @module Context_Moveables */

import { useState, createContext } from "react";

/** Context of the components */
export const MoveableContext = createContext();

/**
 * Global provider of moveables requested by api.
 * @param {any} children - Children to be provided by the context
 * @returns - Moveable supplier component
 */
export function MoveableProvider({ children }) {
  /** Status containing the list of all moveable components */
  const [moveableComponents, setMoveableComponents] = useState([]);
  /** Last moveable component added to the list */
  const [lastMoveable, setLastMoveable] = useState(null);
  /** manages all the movements of each element */
  const [nodeReference, setNodeReference] = useState({});

  /**
   * Function that adds a new object to the list of components to be rendered later on
   * @param {Object} moveable - Properties that the component will have.
   * @returns {void} - Returns nothing
   */
  const addMoveable = (moveable) => {
    setLastMoveable(moveable);
    setMoveableComponents([...moveableComponents, moveable]);
  };

  /**
   * This function will add a state that will save the movement of each element
   * @param {object} moveableMove - Object with the properties to modify.
   * @param {*} id - ID that will identify said properties
   * @returns {void} - Returns nothing
   */
  const addMoveState = (moveableMove, id) =>
    setNodeReference((prevState) => ({
      ...prevState,
      [id]: moveableMove,
    }));

  /**
   * Function that will clean the status of the components, in order to have an empty list.
   * @returns {void} - Returns nothing
   */
  const cleanMoveables = () => {
    setLastMoveable(null);
    setMoveableComponents([]);
    setNodeReference({});
  };

  /**
   * Values to be displayed by the state.
   * @property {Object[]} moveables - List of components to render
   * @property {Object} moveable - Last moveable component added to the status
   * @property {Function} addMoveable - Method that adds a component
   * @property {Function} cleanMoveables - Method that eliminates all moveable components
   */
  const values = {
    moveables: moveableComponents,
    moveable: lastMoveable,
    addMoveable,
    cleanMoveables,
    addMoveState,
    nodeReference,
    setNodeReference,
  };

  return (
    <MoveableContext.Provider value={values}>
      {children}
    </MoveableContext.Provider>
  );
}
