import React from "react";
import { MapPin, Calendar, Clock, Plane } from "lucide-react";
import "../styles/buttons.css";
import {useNavigate} from 'react-router-dom'

export default function FlightCard({flight}) {

  const navigate = useNavigate();
  function bookFlight(flight_id){
    console.log(flight_id);
    navigate(`/booking?flightID=${flight_id}`);

  };
  
  
  return (
    <div className="flex items-center w-[80%] min-w-[80dvw] justify-between bg-white my-4 rounded-xl border-[1px] border-gray-300 px-10 py-5 mx-auto">

      {/* Left */}
      <div className="flex items-center gap-20">  {/* << increased spacing */}

        {/* From */}
        <div className="w-[250px]">
          <p className="text-xs text-gray-500 font-medium">From</p>
          <p className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={18} /> {flight.departure}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            {flight.dep_airport}
          </p>
        </div>

        {/* To */}
        <div className="w-[250px]">
          <p className="text-xs text-gray-500 font-medium">To</p>
          <p className="text-xl font-semibold flex items-center gap-2">
            <MapPin size={18} /> {flight.destination}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            {flight.dest_airport}
          </p>
        </div>

        {/* Date */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Calendar size={16} /> Dep. Date
          </p>
          <p className="text-lg font-semibold">{new Date(flight.departure_date).toLocaleDateString()}</p>
        </div>

        {/* Time */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Clock size={16} /> Dep. Time
          </p>
          <p className="text-lg font-semibold">{flight.departure_time}</p>
        </div>

        {/* Aircraft */}
        <div className="ml-5">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-2 mb-2">
            <Plane size={16} /> Aircraft
          </p>
          <p className="text-lg font-semibold">{flight.aircraft_id}</p>
        </div>

        
      </div>

      {/* Book Button */}
      <button onClick={() => bookFlight(flight.flight_id)} className="accent-btn">
        Book Flight
      </button>

    </div>
  );
}
