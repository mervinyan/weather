import React from "react";

const CityDropdown = ({ cities, currentCity, handleChange }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-info dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {currentCity ? currentCity.name : "  "}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {cities.map(city => (
          <button
            className="dropdown-item clickable"
            key={city.code}
            onClick={() => handleChange(city)}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityDropdown;