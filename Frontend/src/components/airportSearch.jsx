import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { MapPin } from "lucide-react";

function AirportDropdown({ label, onSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/airports")
      .then(res => {
        const formatted = res.data.map(a => ({
          value: a.airport_code,
          label: `${a.city} (${a.airport_code})`
        }));
        setOptions(formatted);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex-1">
      <label className="text-sm font-semibold flex items-center gap-2 mb-3">
        <MapPin className="w-4 h-4 text-gray-700" />
        {label}
      </label>

      <Select
        options={options}
        onChange={onSelect}
        placeholder={`Select ${label}`}
        className="text-black w-[50%]"
        isSearchable
      />
    </div>
  );
}

export default AirportDropdown;
