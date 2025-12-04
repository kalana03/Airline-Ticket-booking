import React, { useState } from "react";
import { Plane, Calendar, Clock, CreditCard, User, Luggage, Info, ShieldCheck, Menu } from "lucide-react";
import "../styles/buttons.css";
import {useNavigate} from 'react-router-dom';

// Seat Component
const Seat = ({ seatNum, status, classType, onClick }) => {
  const baseStyles =
    "relative flex items-center justify-center transition-all duration-500 ease-out rounded-xl font-bold";

  const sizeStyles =
    classType === "business"
      ? "w-16 h-12 text-sm mb-3"
      : "w-10 h-10 text-xs sm:w-11 sm:h-11";

  let specificStyles = "";
  let shadowStyles = "";

  if (status === "booked") {
    specificStyles = "bg-gray-100 text-gray-300 cursor-not-allowed";
  } else if (status === "selected") {
    specificStyles =
      "bg-blue-900 text-white transform scale-[1.03] z-10";
    shadowStyles = "";
  } else if (classType === "business") {
    specificStyles =
      "bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 cursor-pointer";
    shadowStyles = "";
  } else {
    specificStyles =
      "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 cursor-pointer";
    shadowStyles = "";
  }

  return (
    <button
      onClick={() => status !== "booked" && onClick(seatNum)}
      disabled={status === "booked"}
      className={`${baseStyles} ${sizeStyles} ${specificStyles} ${shadowStyles}`}
    >
      {seatNum.replace(/[0-9]/g, "")}
    </button>
  );
};

export default function SeatMapMultiSelect({det, booked = [], onSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const businessRows = det.business_rows;
  const economyRows = det.economy_rows;
  
  function generateSeatLetters(layout) {
    const blocks = layout.split("-").map(Number); // [3,3,3]
    const letters = [];
    let charCode = "A".charCodeAt(0);

    blocks.forEach((blockSize, i) => {
      for (let j = 0; j < blockSize; j++) {
        letters.push(String.fromCharCode(charCode));
        charCode++;
      }
      // add empty string to represent aisle between blocks, except after last block
      if (i !== blocks.length - 1) letters.push("");
    });

    return letters;
  }

  const navigate = useNavigate();

  function handlesubmit(flightID, seatArray) {
    
    navigate(`/checkout`, {state: {flightID: flightID, seats:seatArray}});
  }

  const businessLayout = generateSeatLetters(det.business_layout);
  const economyLayout = generateSeatLetters(det.economy_layout);

  const handleSeatClick = (seat) => {
    let newSelection;

    if (selectedSeats.includes(seat)) {
      newSelection = selectedSeats.filter((s) => s !== seat);
    } else {
      newSelection = [...selectedSeats, seat];
    }

    setSelectedSeats(newSelection);
    if (onSelect) onSelect(newSelection);
  };

  const getSeatStatus = (seatNum) => {
    if (booked.includes(seatNum)) return "booked";
    if (selectedSeats.includes(seatNum)) return "selected";
    return "available";
  };
  const BUSINESS_PRICE = det.business_class_price;
  const ECONOMY_PRICE = det.economy_class_price;

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = parseInt(seat);
      
      const price = row <= businessRows ? BUSINESS_PRICE : ECONOMY_PRICE;
      return total + parseInt(price);
    }, 0);
  };

  const renderRow = (rowNumber, layout, isBusiness) => (
    <div
      key={rowNumber}
      className={`flex items-center justify-center ${
        isBusiness ? "gap-4" : "gap-2"
      } mb-3`}
    >
      <span className="w-6 text-center text-sm text-gray-500 font-semibold">
        {rowNumber}
      </span>

      {layout.map((col, i) => {
        if (col === "")
          return (
            <div
              key={i}
              className={`shrink-0 ${isBusiness ? "w-8" : "w-3"}`}
            ></div>
          );

        const seatNum = `${rowNumber}${col}`;

        return (
          <Seat
            key={seatNum}
            seatNum={seatNum}
            classType={isBusiness ? "business" : "economy"}
            status={getSeatStatus(seatNum)}
            onClick={handleSeatClick}
          />
        );
      })}

      <span className="w-6 text-center text-sm text-gray-500 font-semibold">
        {rowNumber}
      </span>
    </div>
  );

  function handleSeatSelect(){

  }

  return (
    <div className="flex xl:flex-row gap-8 mt-24 w-7xl max-h-[80vh] items-start">
      <div className="flex-1 bg-white rounded-xl border border-gray-200">
        <div className="text-center mb-8">
          <div className="px-8 mb-8 py-4 border-b border-gray-200 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-gray-800">Select Your Seat</h2>
            </div>
          <p className="text-gray-500 text-base font-medium mt-2">
            {det.aircraft_id} • {det.model}
          </p>
        </div>

        <div className="overflow-y-auto max-h-[75vh] scrollbar-hide px-2">
          <div className="flex items-center justify-center mb-6">
            <span className="text-sm font-bold uppercase tracking-wider mb-4 text-blue-900">
              Business Class
            </span>
          </div>
          {Array.from({ length: businessRows }).map((_, i) =>
            renderRow(i + 1, businessLayout, true)
          )}

          <div>
            <div className="flex items-center justify-center my-6">
              <span className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-600">
                Economy Class
              </span>
            </div>
            {Array.from({ length: economyRows }).map((_, i) =>
              renderRow(i + businessRows + 1, economyLayout, false)
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="w-full xl:w-[26rem] flex flex-col gap-6 sticky top-12">
        <div className="bg-white rounded-xl border border-gray-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="px-8 mb-8 py-4 border-b border-gray-200 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-gray-800">Your Selection</h2>
            </div>
            <div className="px-8 pb-8">
              <div className="space-y-4 mb-10 min-h-[100px]">
                {selectedSeats.length === 0 ? (
                  <p className="text-gray-400 italic text-center py-8">
                    No seats selected
                  </p>
                ) : (
                  selectedSeats.map((seat) => {
                    const isBiz = parseInt(seat) <= businessRows;
                    return (
                      <div
                        key={seat}
                        className="flex justify-between items-center animate-fadeIn border-b border-gray-100 pb-2"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isBiz ? "bg-blue-600" : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-xl text-gray-800">
                            {seat}
                          </span>
                          <span className="text-xs text-gray-500 uppercase">
                            {isBiz ? "Business" : "Economy"}
                          </span>
                        </div>
                        <span className="text-lg text-gray-900">
                          ${isBiz ? BUSINESS_PRICE : ECONOMY_PRICE}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex justify-between items-baseline border-t-2 border-gray-100 pt-6">
                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Total Price
                </span>
                <span className="text-2xl text-gray-900">
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={() =>
                  handlesubmit(det.flight_id, selectedSeats)
                }
                className={`accent-btn min-w-full mt-8 ${
                  selectedSeats.length > 0
                    ? "text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Selection ({selectedSeats.length})
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
