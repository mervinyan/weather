import React from "react";

import Switch from "react-switch";

const TemperatureUnitToggle = ({ isCelsius, handleToggle }) => {
  return (
    <Switch
      className="align-middle"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 15,
            color: "orange",
            paddingRight: 2
          }}
        >
          F
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 15,
            color: "orange",
            paddingRight: 2
          }}
        >
          C
        </div>
      }
      onChange={handleToggle}
      checked={isCelsius}
    />
  );
};

export default TemperatureUnitToggle;
