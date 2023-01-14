import { useContext } from "react";
import { MoveableContext } from "../context/moveablesContext";
import { ImagesContext } from "../context/imgesContext";

export const useImages = () => useContext(ImagesContext);
export const useMoveables = () => useContext(MoveableContext);
