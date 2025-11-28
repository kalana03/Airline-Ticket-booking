import React from "react";
import './index.css'
import './App.css'

function Header() {
  return (
    <header className="bg-white text-primary-content  fixed top-0 left-0 w-full z-10">
      <div className=" mx-8 my-4 flex justify-between items-center px-2">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="src/assets/Images/Delta-Air-Lines-Logo.png"

            className="h-8 rounded-full"
          />

        </div>

        {/* Navigation */}
        <nav className="space-x-4 flex gap-12">

          <a href="#" className="btn btn-ghost btn-sm">
            Flights
          </a>
          <a href="#" className="btn btn-ghost btn-sm">
            About
          </a>
          <a href="#" className="btn btn-ghost btn-sm">
            Contact
          </a>
        </nav>


      </div>
    </header>
  );
}

export default Header;
