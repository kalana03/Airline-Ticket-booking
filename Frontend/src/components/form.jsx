import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Search } from "lucide-react";

function FlightSearchForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Searching flights from", from, "to", to, "on", date);

    fetch("http://localhost:5000/searchFlights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, date })
  })
    .then((res) => res.json())
    .then((data) => setSearchResults(data))
    .catch((err) => console.log("Error searching flights:", err));
  }
  
  // Load airports once from backend
  useEffect(() => {
    fetch("http://localhost:5000/airports")
      .then((res) => res.json())
      .then((data) => setAirports(data))
      .catch((err) => console.log("Error fetching:", err));
  }, []);

  // Filter airports when typing
  useEffect(() => {
    if (!from.trim()) {
      setFilteredAirports([]);
      return;
    }

    const results = airports.filter((a) =>
      `${a.city} ${a.airport_code}`
        .toLowerCase()
        .includes(from.toLowerCase())
    );

    setFilteredAirports(results);
  }, [from, airports]);

  return (
    <div className="w-auto flex justify-center mb-[5%]">
      <form className="bg-white p-10 w-auto flex justify-center rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-10 items-end max-w-6xl">

          {/* From */}
          <div className="flex-1 flex gap-6 items-center relative">
            <label className="text-sm font-semibold flex items-center gap-2 ">
              <MapPin className="w-4 h-4 text-gray-700" />
              From
            </label>

            <input
              type="text"
              value={from}
              placeholder="Colombo (CMB)"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 outline-none transition"
              onChange={(e) => {
                setFrom(e.target.value);
                setShowFromDropdown(true);
                setFilteredFromAirports(
                  airports.filter((a) =>
                    `${a.city} ${a.airport_code}`.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
            />

            {showFromDropdown && filteredFromAirports.length > 0 && (
              <ul className="absolute bottom-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto z-20">
                {filteredFromAirports.map((a) => (
                  <li
                    key={a.airport_code}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setFrom(`${a.city} (${a.airport_code})`);
                      setShowFromDropdown(false);
                    }}
                  >
                    {a.city} ({a.airport_code})
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* To — keep as you have */}
          <div className="flex-1 flex gap-6 items-center relative">
            <label className="text-sm font-semibold flex items-center gap-2 ">
              <MapPin className="w-4 h-4 text-gray-700" />
              To
            </label>
            <input
              type="text"
              value={to}
              placeholder="Colombo (CMB)"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 outline-none transition"
              onChange={(e) => {
                setTo(e.target.value);
                setShowToDropdown(true);
                setFilteredToAirports(
                  airports.filter((a) =>
                    `${a.city} ${a.airport_code}`.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
              }}
              onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
            />

            {showToDropdown && filteredToAirports.length > 0 && (
              <ul className="absolute bottom-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-48 overflow-y-auto z-20">
                {filteredToAirports.map((a) => (
                  <li
                    key={a.airport_code}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setTo(`${a.city} (${a.airport_code})`);
                      setShowToDropdown(false);
                    }}
                  >
                    {a.city} ({a.airport_code})
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* Date */}
          <div className="flex-1 flex gap-6 items-center relative">
            <label className="text-sm font-semibold flex items-center gap-2 ">
              <Calendar className="w-4 h-4 text-gray-700" />
              Departure
            </label>
            <input
              type="date"
              value={date}
              className="w-full h-12 px-4 rounded-lg border border-gray-300 outline-none transition"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center gap-4 h-12 px-10 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default FlightSearchForm;
