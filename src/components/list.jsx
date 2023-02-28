import { useEffect } from "react";
import { useMoveables } from "../hooks/useContexts";

export function ListItems() {
  const { moveables, nodeReference } = useMoveables();

  const updateValues = (elements, callback) => {
    elements.forEach((element) => {
      let id = element.getAttribute("data-target");
      callback(id, element);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const [dataWidth, dataHeight, dataLeft, dataRight] = [
        document.querySelectorAll(".table-data.width"),
        document.querySelectorAll(".table-data.height"),
        document.querySelectorAll(".table-data.left"),
        document.querySelectorAll(".table-data.right"),
      ];

      updateValues(dataWidth, (id, element) => {
        let value = Math.round(nodeReference[id]?.width);
        element.innerHTML = value;
      });

      updateValues(dataHeight, (id, element) => {
        let value = Math.round(nodeReference[id]?.height);
        element.innerHTML = value;
      });

      updateValues(dataLeft, (id, element) => {
        let value = Math.round(nodeReference[id]?.translate[0]);
        element.innerHTML = value;
      });

      updateValues(dataRight, (id, element) => {
        let value = Math.round(nodeReference[id]?.translate[1]);
        element.innerHTML = value;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [nodeReference]);

  return (
    <section className="table-items">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a id="name" className="filter__link" href="/">
              Imagen
            </a>
          </div>
          <div className="header__item">
            <a id="author" className="filter__link" href="/">
              Author
            </a>
          </div>
          <div className="header__item">
            <a id="id" className="filter__link filter__link--number" href="/">
              ID
            </a>
          </div>
          <div className="header__item">
            <a
              id="left"
              className="filter__link filter__link--number"
              href="/"
            >
              Lefth
            </a>
          </div>
          <div className="header__item">
            <a
              id="rigth"
              className="filter__link filter__link--number"
              href="/"
            >
              Right
            </a>
          </div>
          <div className="header__item">
            <a
              id="width"
              className="filter__link filter__link--number"
              href="/"
            >
              Width
            </a>
          </div>
          <div className="header__item">
            <a
              id="height"
              className="filter__link filter__link--number"
              href="/"
            >
              Height
            </a>
          </div>
        </div>
        <div className="table-content">
          {moveables.map((moveable) => (
            <div className="table-row" key={`item-${moveable.id}`}>
              <div className="table-data">
                <a href={moveable.link}>
                  <img src={moveable.img} alt="" className="img-preview" />
                </a>
              </div>
              <div className="table-data">{moveable.author}</div>
              <div className="table-data">{moveable.id}</div>
              <div className="table-data left" data-target={moveable.id}></div>
              <div className="table-data right" data-target={moveable.id}></div>
              <div className="table-data width" data-target={moveable.id}></div>
              <div
                className="table-data height"
                data-target={moveable.id}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
