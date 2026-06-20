import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CVProvider } from "./context/CVContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </React.StrictMode>
);
