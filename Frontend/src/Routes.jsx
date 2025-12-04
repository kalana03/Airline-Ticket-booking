// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // your current App with hero + FlightSearchForm
import Flights from "./FlightsPage.jsx";
import Booking from "./Booking.jsx";
import Checkout from "./checkout.jsx";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* Add more routes later when needed */}
    </Routes>
  );
}
