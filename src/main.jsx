import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppState from "./AppState"; // Adjust the path as necessary
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

createRoot(document.getElementById("root")).render(
  <AppState>
    <App />
  </AppState>
);
