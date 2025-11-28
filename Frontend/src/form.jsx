import React from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';

function FlightSearchForm() {
  return (
    <div className="w-full flex justify-center mb-[0%] ">
      <form className="bg-white shadow-lg srounded-2xl p-6 w-full w-full flex justify-center">

        <div className="flex flex-col md:flex-row gap-6 items-end max-w-6xl">

          {/* From */}
          <div className="flex-1">
            <label className="text-sm font-semibold flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-700" />
              From
            </label>
            <input
              type="text"
              placeholder="Colombo (CMB)"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 
                          outline-none transition"
            />
          </div>

          {/* To */}
          <div className="flex-1">
            <label className="text-sm font-semibold flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-700" />
              To
            </label>
            <input
              type="text"
              placeholder="London (LHR)"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 
                          outline-none transition"
            />
          </div>

          {/* Departure Date */}
          <div className="flex-1">
            <label className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-700" />
              Departure
            </label>
            <input
              type="date"
              className="w-full h-12 px-4 rounded-lg border border-gray-300 
                         text-gray-700 outline-none transition"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 h-12 px-8 
                       bg-black text-white rounded-lg font-semibold 
                       hover:bg-gray-800 transition"
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
