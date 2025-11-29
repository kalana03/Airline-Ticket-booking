import React from "react";
import { MapPin, Calendar, Clock, Plane } from "lucide-react";
import "../styles/buttons.css";

export default function FlightCard() {
  const flight = {
    departure: "CMB",
    departureName: "Bandaranaike International Airport",

    destination: "DXB",
    destinationName: "Dubai International Airport",

    date: "2025-02-15",
    time: "08:45 AM",

    aircraft: "Airbus A330-300"
  };

  return (
    <div className="flex items-center w-[80%] min-w-[80dvw] justify-between bg-white my-4 rounded-xl border-[1px] border-gray-300 px-10 py-5 mx-auto">

      {/* Left */}
      <div className="flex items-center gap-20">  {/* << increased spacing */}

        {/* From */}
        <div>
          <p className="text-xs text-gray-500 font-medium">From</p>
          <p className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={18} /> {flight.departure}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            {flight.departureName}
          </p>
        </div>

        {/* To */}
        <div>
          <p className="text-xs text-gray-500 font-medium">To</p>
          <p className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={18} /> {flight.destination}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            {flight.destinationName}
          </p>
        </div>

        {/* Date */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Calendar size={16} /> Dep. Date
          </p>
          <p className="text-lg font-semibold">{flight.date}</p>
        </div>

        {/* Time */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Clock size={16} /> Dep. Time
          </p>
          <p className="text-lg font-semibold">{flight.time}</p>
        </div>

        {/* Aircraft */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Plane size={16} /> Aircraft
          </p>
          <p className="text-lg font-semibold">{flight.aircraft}</p>
        </div>

        
      </div>

      {/* Book Button */}
      <button className="accent-btn">
        Book Flight
      </button>

    </div>
  );
}
