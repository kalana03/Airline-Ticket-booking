// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // your current App with hero + FlightSearchForm
import Flights from "./FlightsPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/flights" element={<Flights />} />
      {/* Add more routes later when needed */}
    </Routes>
  );
}
