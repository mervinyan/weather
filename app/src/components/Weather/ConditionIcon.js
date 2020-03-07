import React from "react";

import "./css/weather-icons.min.css";

const keywords = ["cloudy", "cloud", "rain", "snow", "windy", "fog", "showers", "smog", "lighting", "thunderstorm"];

const ConditionIcon = ({ condition }) => {
  if (!condition) {
    return <React.Fragment />;
  }
  for (let keyword of keywords) {
    if (condition.toLowerCase().includes(keyword)) {
      return <i className={`wi wi-${keyword}`}></i>;
    }
  }

  return <React.Fragment />;
};

export default ConditionIcon;
