import React, { useState, useEffect } from "react";
import './styles/buttons.css'; 
import Header from "./components/Header";
import SeatSelect from "./components/SeatSelector";
import { useSearchParams } from "react-router-dom";

export default function Booking(){
  const [flightDetails, setFlightDetails] = useState(null);

  const [searchParams] = useSearchParams();
  const flightID = searchParams.get("flightID");

   useEffect(() => {
    if (!flightID) return;
  
  fetch(`http://localhost:5000/flightDetails?flight_id=${flightID}`)
      .then(res => res.json())
      .then(data => {
        console.log("Flight details:", data);
        setFlightDetails(data); // store in state
      })
      .catch(err => console.error(err));
  }, [flightID]);
  
  return(
    <div>
      
      <Header />
      <div className="w-full flex justify-center">
        {flightDetails && <SeatSelect det={flightDetails} /> }
      </div>


    </div>
  )
}