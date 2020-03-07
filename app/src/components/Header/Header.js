import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./weather_logo.png";

const Header = () => {
  return (
    <header>
      <nav className="container navbar navbar-expand-md navbar-light bg-light fixed-top">
        <NavLink className="navbar-brand" to="/">
          <img className="mr-2" src={logo} alt="Logo" />
          <span className="d-none d-lg-inline">{`Weather App`}</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/weather">
                {`Weather`}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery">
                {`Gallery`}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;