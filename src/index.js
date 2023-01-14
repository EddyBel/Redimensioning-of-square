import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImagesProvider } from "./context/imgesContext";
import { MoveableProvider } from "./context/moveablesContext";
import "./styles/index.css";
import "./styles/spinner.css";
import "./styles/button.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImagesProvider>
    <MoveableProvider>
      <App />
    </MoveableProvider>
  </ImagesProvider>
);
