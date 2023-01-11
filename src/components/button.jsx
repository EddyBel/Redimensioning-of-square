export function Button({ children, onClick, id = "button__add_moveable1" }) {
  return (
    <button className="app__button" id={id} onClick={onClick}>
      {children}
    </button>
  );
}
