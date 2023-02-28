/** Sample Api where the images will be requested */
const API = "https://picsum.photos/v2/list?page=1&limit=100";
/** Property where the image is obtained */
const PROPERTY_IMG = "download_url";
/** Owned where the author of the image is obtained */
const PROPERTY_AUTHOR = "author";
/** Image address */
const PROPERTY_LINK = "url";
/** List of colors  */
const COLORS = ["red", "blue", "yellow", "green", "purple"];
/** Default position and size */
const POSITION_AND_SIZE = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
};

export {
  API,
  COLORS,
  POSITION_AND_SIZE,
  PROPERTY_AUTHOR,
  PROPERTY_IMG,
  PROPERTY_LINK,
};
