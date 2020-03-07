import React from "react";

const Alert = ({message}) => {
  return (
    <div className="alert alert-danger">
      <span>
        <strong>Error!</strong> {message}
      </span>
    </div>
  );
};

export default Alert;