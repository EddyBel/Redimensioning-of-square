import { useEffect, useState } from "react";
import Moveable from "react-moveable";

export function Component({ imagen, color, id, top, left, err }) {
  const [target, setTarget] = useState();
  const [dragTarget, setDragTarget] = useState();
  const [nodoReferencia, setNodoReferencia] = useState({
    width: 0,
    height: 0,
    translate: [10, 10],
  });

  const getTargetId = (target) => target.getAttribute("data-target");

  const updateTarget = (target) => {
    const targetId = getTargetId(target);
    if (nodoReferencia) {
      setDragTarget(targetId);
      setTarget(target);
    }
  };

  const updateMoveable = (e) => {
    let target = e.target;
    let beforeTranslate = e.beforeTranslate;
    let frames = Object.assign(nodoReferencia);

    frames.translate = [...beforeTranslate];
    setNodoReferencia(frames);
    target.style.left = `${beforeTranslate[0]}px`;
    target.style.top = `${beforeTranslate[1]}px`;
  };

  const onResize = (e) => {
    let target = e.target;
    let newWidth = e.width;
    let newHeight = e.height;
    let frames = Object.assign(nodoReferencia);
    frames.width = newWidth;
    frames.height = newHeight;

    setNodoReferencia(frames);

    target.style.width = `${newWidth}px`;
    target.style.height = `${newHeight}px`;
  };

  const onResizeStart = (e) => {
    let setOrigin = e.setOrigin;
    let dragStart = e.dragStart;
    setOrigin(["%", "%"]);
    dragStart && dragStart.set(nodoReferencia.translate);
  };

  useEffect(() => {
    setDragTarget(document.getElementById("component"));
  }, []);

  return (
    <>
      {err ? (
        <div
          onClick={(e) => updateTarget(e.target)}
          id={`component-${id}`}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            top: top,
            left: left,
            background: color,
          }}
        ></div>
      ) : (
        <img
          onClick={(e) => updateTarget(e.target)}
          id={`component-${id}`}
          src={imagen}
          style={{ position: "absolute", width: "100px", top: top, left: left }}
        />
      )}
      <Moveable
        target={target}
        dragTarget={dragTarget}
        draggable={true}
        resizable={true}
        throttleResize={0}
        throttleDrag={0}
        snappable={true}
        bounds={{ left: 0, top: 0, right: 800, bottom: 500 }}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => {
          set(nodoReferencia.translate);
        }}
        onDrag={updateMoveable}
        onResizeStart={onResizeStart}
        onResize={onResize}
      />
    </>
  );
}
