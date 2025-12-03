import React from "react";
import heroImg from "./assets/Images/hero.webp"; // adjust path to your image
import FlightSearchForm from "./components/form.jsx";
import Flights from "./components/Flights.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="w-full h-screen relative">
      <Header />
      {/* Hero section */}
      <div
        className="w-full h-full bg-center bg-cover  flex flex-col items-center justify-between"
        style={{ backgroundImage: `url(${heroImg})`, objectFit: "cover" }}
      >
        <div className="text-center bg-opacity-40 p-8 rounded-lg flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-bold text-blue mt-[25%] ">
            Welcome to Delta Airlines
          </h1>
          <p className="text-lg md:text-xl text-green mb-6">
            Book your flights easily and conveniently with Delta Airlines.
          </p>
        </div>
        <div className = "mb-[5%]">
          <FlightSearchForm />
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
