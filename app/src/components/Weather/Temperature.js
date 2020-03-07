import React from "react";

const Temperature = ({ temperature, isCelsius }) => {
  if (!temperature) {
    return (<React.Fragment> </React.Fragment>)
  }
  return (
    <span>
      {temperature} {isCelsius ? "C" : "F"}
    </span>
  );
};

export default Temperature;
