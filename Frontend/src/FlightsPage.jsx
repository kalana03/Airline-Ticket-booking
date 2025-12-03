import React from "react";
import Header from "./components/Header.jsx";
import Form from "./components/form.jsx";
import FlightCard from "./components/Flights.jsx";
import {useLocation} from "react-router-dom";


function FlightsPage() {
    const location = useLocation();
    const flights = location.state || [];

    

    return (
        <div className="p-4">
            <Header />
            <div className = "mt-12"> 
                <Form />
            </div>
        
            {flights.length === 0 ? (
                <p className="text-center mt-8 text-gray-600">No flights found.</p>
            ) : (
                flights.map((flight) => (
                    <FlightCard key={flight.flight_id} flight={flight} />
                ))
            )}

            
        {/* Flight listings would go here */}
        </div>
    );
}

export default FlightsPage;
