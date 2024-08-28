import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import     RateCard from "./RateCard.jsx" 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RateCard />
    {/* <App/> */}
  </StrictMode>
);