/** This element is that it will move visually, this is an image that will be loaded from an api */
export function Elements({ elements, setElement, setTarget }) {
  /** This function is executed when this element is clicked, it gets the clicked element and its id passed as "data-target" attribute and loads this data in an outer state */
  const getElement = (target) => {
    setElement(target);
    setTarget(target.getAttribute("data-target"));
  };

  /** Loop through the elements passed by parameter and assign them the corresponding properties. */
  return elements.map((element) => (
    <img
      onClick={(e) => getElement(e.target)}
      data-target={element.id}
      className="moveable__component"
      id={`component-${element.id}`}
      alt={`component-${element.id}`}
      src={element.img}
      key={element.id}
      style={{
        position: "absolute",
        borderRadius: "12px",
        width: element.width,
        height: element.height,
        top: element.top,
        left: element.left,
      }}
    />
  ));
}
