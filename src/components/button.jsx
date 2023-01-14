/**
 * Component that is a basic button
 * @param {any} children - Children of the component
 * @param {Function} onClick - Function to be executed when clicking on the button.
 * @param {string} id - Button id
 * @returns - Basic button component
 */
export function Button({ children, onClick, id = "button__add_moveable1" }) {
  return (
    <button className="app__button" id={id} onClick={onClick}>
      {children}
    </button>
  );
}
