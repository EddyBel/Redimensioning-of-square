/** Class that creates the properties of the moveable component */
class MoveableProps {
  constructor(
    id,
    color,
    img,
    error,
    width,
    height,
    left,
    top,
    limitBottom,
    limitRight
  ) {
    this.id = id;
    this.color = color;
    this.img = img;
    this.error = error;
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.limitBottom = limitBottom;
    this.limitRight = limitRight;
  }
}

export { MoveableProps };
