import React, { useState } from "react";
import './styles/buttons.css'; 
import Header from "./components/Header";
import SeatSelect from "./components/SeatSelector";

export default function Booking(){
  return(
    <div>
      <Header />
      <div className="w-full flex justify-center">
        <SeatSelect />
      </div>

    </div>
  )
}