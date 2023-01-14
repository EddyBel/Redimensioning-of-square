import { useState, createContext } from "react";

/** Context of the components */
export const MoveableContext = createContext();

export function MoveableProvider({ children }) {
  /** Status containing the list of all moveable components */
  const [moveableComponents, setMoveableComponents] = useState([]);
  /** Last moveable component added to the list */
  const [lastMoveable, setLastMoveable] = useState(null);

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
   * Function that will clean the status of the components, in order to have an empty list.
   * @returns {void} - Returns nothing
   */
  const cleanMoveables = () => {
    setLastMoveable(null);
    setMoveableComponents([]);
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
  };

  return (
    <MoveableContext.Provider value={values}>
      {children}
    </MoveableContext.Provider>
  );
}
