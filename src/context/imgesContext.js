/** @module Context_Images */

import { createContext, useState, useEffect } from "react";
import { get_images } from "../services/getImages.api";

/** Context of the images passed by the api */
export const ImagesContext = createContext();

/**
 * Global provider of images requested by api.
 * @param {any} children - Children to be provided by the context
 * @returns - Component providing image context
 */
export function ImagesProvider({ children }) {
  /** State in which you save the images requested to api */
  const [images, setImages] = useState(null);
  /** State containing the length of the images */
  const [lengthImages, setLengthImages] = useState(0);
  /** Error-controlling state */
  const [errorImg, setErrorImg] = useState(false);

  /** State that will make the request to the server and store it in the global context. */
  useEffect(() => {
    get_images()
      .then((response) => {
        setImages(response);
        setErrorImg(false);
      })
      .catch((err) => setErrorImg(true));
    return () => setImages(null);
  }, []);

  /** Obtains the total length of the images obtained by the api */
  useEffect(() => {
    if (!images) setLengthImages(0);
    else setLengthImages(images.length);
    return () => setLengthImages(0);
  }, [images]);

  /** Global context values to be exported */
  const values = {
    images: images,
    lengthImages: lengthImages,
    error: errorImg,
  };

  return (
    <ImagesContext.Provider value={values}>{children}</ImagesContext.Provider>
  );
}
