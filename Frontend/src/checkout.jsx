import React, { useState, useEffect } from "react";
import { Plane, Calendar, Clock, CreditCard, User, Info, ShieldCheck, Check, Menu } from "lucide-react";
import { useLocation,useNavigate } from 'react-router-dom';

// Inline Header to ensure preview works without external files
const Header = () => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="bg-blue-900 p-1.5 rounded-lg">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">AeroGlide</span>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default function Checkout() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { flightID, seats } = location.state || {}; 
  const [flightDetails, setFlightDetails] = useState(null);

  console.log(seats);

  useEffect(() => {
    // Mock data fallback for preview purposes if no flightID is present
    if (!flightID) {
         setFlightDetails({
            dep_ap: "CMB",
            dep_city: "Colombo",
            des_ap: "DXB",
            des_city: "Dubai",
            aircraft_id: "SL-123",
            model: "Airbus A320",
            departure_date: "2025-12-10T00:00:00",
            departure_time: "08:30 AM",
            business_rows: 3,
            business_class_price: 1450,
            economy_class_price: 520
         });
         return;
    }

    fetch(`http://localhost:5000/flightDetails?flight_id=${flightID}`)
      .then(res => res.json())
      .then(data => {
        console.log("Flight details:", data);
        setFlightDetails(data);
      })
      .catch(err => console.error(err));
  }, [flightID]);

  const [passenger, setPassenger] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    passport_id: ""
  });

  // Guard clause - check if data is loaded
  // Note: Modified slightly to allow preview with mock data if needed, but logic remains
  if (!flightDetails) {
    return <div className="min-h-screen flex items-center justify-center text-blue-900 font-medium">Loading flight details...</div>;
  }
  
  // Default empty seats array for preview if undefined
  const safeSeats = seats || ["1A"]; 

  // Helper function to extract row number from seat string (e.g., "5A" -> 5)
  const getSeatRow = (seat) => {
    return parseInt(seat.match(/\d+/)[0]);
  };

  // Calculate sum using reduce
  const sum = safeSeats.reduce((total, seat) => {
    const row = getSeatRow(seat);
    if (row <= flightDetails.business_rows) {
      return total + parseInt(flightDetails.business_class_price);
    } else {
      return total + parseInt(flightDetails.economy_class_price);
    }
  }, 0);

  const seatObjects = safeSeats.map(seat => {
    const row = getSeatRow(seat);
    const isBusiness = row <= flightDetails.business_rows;

    return {
      seatNumber: seat,
      classType: isBusiness ? "Business" : "Economy",
      price: isBusiness
        ? parseInt(flightDetails.business_class_price)
        : parseInt(flightDetails.economy_class_price)
    };
  });

  function HandleSubmit(e) {
    e.preventDefault();

    const payload = {
      passenger_info: passenger,   
      seats: seatObjects,           
      flightID: flightID              
    };

    console.log("Submitting Booking:", payload);

    // Show success modal immediately for demo/preview
    setShowSuccess(true);

    // Send to backend
    fetch("http://localhost:5000/bookFlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Booking success:", data);
        // setShowSuccess(true); // Moved up for immediate feedback in preview
      })
      .catch(err => console.error("Booking error:", err));
  }

  
  return (
    <div className="min-h-screen bg-white mb-8 relative">
      <Header />

      {/* Main Container */}
      <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Forms */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          
          {/* Passenger Details */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-gray-800">Passenger Details</h2>
            </div>
            
            <div className="px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="John"
                  value={passenger.first_name}
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"   
                  onChange={(e) => setPassenger({ ...passenger, first_name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Last Name *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Doe"
                  value={passenger.last_name}
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"   
                  onChange={(e) => setPassenger({ ...passenger, last_name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input 
                  required 
                  type="email" 
                  placeholder="john@example.com"
                  value={passenger.email}
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"   
                  onChange={(e) => setPassenger({ ...passenger, email: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone *</label>
                <input 
                  required 
                  type="tel" 
                  placeholder="+94 77 123 4567"
                  value={passenger.contact_number}
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"   
                  onChange={(e) => setPassenger({ ...passenger, contact_number: e.target.value })} 
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-sm font-medium text-gray-700">Passport Number *</label>
                <input 
                  required 
                  type="text"
                  value={passenger.passport_id}
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all"   
                  onChange={(e) => setPassenger({ ...passenger, passport_id: e.target.value })}
                />
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Info size={14} /> Must match your travel document.
                </p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-8 py-4 border-b border-gray-200 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-900" />
              <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
            </div>

            <div className="px-8 py-4 space-y-4">
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Card Number *</label>
                <div className="relative">
                  <input 
                    required 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    className="w-full pl-10 rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all" 
                  />
                  <CreditCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Expiry *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">CVV *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="123"
                    className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Cardholder Name *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Name on card"
                  className="w-full rounded-lg border-gray-300 p-2.5 border outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 transition-all" 
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 p-3 rounded-lg border border-gray-100">
                <ShieldCheck size={18} className="text-blue-900"/>
                <span>Your payment is secured</span>
              </div>

              <button 
                onClick={HandleSubmit} 
                className="w-full bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 transform active:scale-[0.99]"
              >
                Confirm & Pay $ {sum}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Summary Sidebar */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden">
            
            {/* Header / Route Visual */}
            <div className="bg-blue-900 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                 <Plane size={120} />
              </div>
              
              <div className="flex items-center justify-between mb-2 relative z-10">
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-wider">{flightDetails.dep_ap}</div>
                  <div className="text-xs text-blue-200 uppercase">{flightDetails.dep_city}</div>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                   <div className="w-full h-px bg-blue-500/50 relative">
                     <Plane size={30} className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white" />
                   </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold tracking-wider">{flightDetails.des_ap}</div>
                  <div className="text-xs text-blue-200 uppercase">{flightDetails.des_city}</div>
                </div>
              </div>
              <p className="text-center text-sm text-blue-100 mt-4 font-medium">{flightDetails.aircraft_id}  •  {flightDetails.model}</p>
            </div>

            {/* Flight Details Grid */}
            <div className="p-6 pb-8 space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-gray-200">
                <div>
                   <span className="block text-xs text-gray-400 uppercase font-semibold">Date</span>
                   <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <Calendar size={16} className="text-blue-900"/> {flightDetails.departure_date.split('T')[0]}
                   </div>
                </div>
                <div>
                   <span className="block text-xs text-gray-400 uppercase font-semibold">Time</span>
                   <div className="flex items-center gap-2 text-gray-700 font-medium">
                     <Clock size={16} className="text-blue-900"/> {flightDetails.departure_time}
                   </div>
                </div>
              </div>

              {/* Seat Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Your Selection</h3>
                
                {safeSeats && safeSeats.length > 0 ? (
                  safeSeats.map((seat, index) => {
                    const row = getSeatRow(seat);
                    const isBusiness = row <= flightDetails.business_rows;
                    const price = isBusiness ? flightDetails.business_class_price : flightDetails.economy_class_price;
                    
                    return (
                      <div key={index} className="flex py-2 justify-between items-center text-sm">
                        <div className="flex gap-3 items-center">
                          <span className="font-medium text-gray-800">Seat {seat}</span>
                          <span className="text-xs text-blue-900 font-bold uppercase tracking-wide">
                            {isBusiness ? "Business" : "Economy"}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-700">$ {price}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 italic text-center py-8">No seats selected</p>
                )}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>$ {sum}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Taxes & Fees</span>
                  <span>$ 0.00</span>
                </div>
                <div className="flex justify-between items-center mt-8">
                   <span className="text-gray-900 text-lg">Total</span>
                   <div className="text-right block text-2xl font-bold text-blue-900">
                        $ {sum} <span className="text-xs ml-1 font-medium text-gray-500">USD</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PROFESSIONAL SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowSuccess(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center transform transition-all scale-100 animate-fadeIn">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Check className="h-8 w-8 text-green-600" strokeWidth={3} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500 mb-8">
                    Thank you for flying with Delta Airlines.<br /> Your e-ticket and receipt have been sent to <span className="font-medium text-gray-900">{passenger.email || "your email"}</span>.
                </p>
                
                <button 
                    className="w-full bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </button>
            </div>
        </div>
      )}

    </div>
  );
}