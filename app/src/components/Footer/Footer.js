import React from "react";
import moment from "moment";

import "./style.css";

const Footer = () => {
  return (
    <footer className="footer text-center">
      <span className="copyright ml-3">
        {`@ ${moment().format("YYYY")} Weather Network, All Rights Reserved.`}
      </span>
    </footer>
  );
};

export default Footer;
