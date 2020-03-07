import React from "react";

import "./style.css";

export const webpFileUrl = (photoUrl) => {
  return process.env.REACT_APP_API_BASE_URL + `/photo?photoUrl=${encodeURIComponent( photoUrl.replace(".jpeg", "") + ".webp" )}`;
}

export const jpegFileUrl = (photoUrl) => {
  return process.env.REACT_APP_API_BASE_URL + `/photo?photoUrl=${encodeURIComponent( photoUrl.replace(".jpeg", "") + ".jpeg" )}`;
}

const Photo = ({ photoUrl, className, style, onClick }) => {
  if (!photoUrl) {
    return <React.Fragment />
  }
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={webpFileUrl(photoUrl)}
      />
      <source
        type="image/jpeg"
        srcSet={jpegFileUrl(photoUrl)}
      />
      <img
        className={className}
        srcSet={jpegFileUrl(photoUrl)}
        style={style}
        alt="Weather"
        onClick={onClick}
      />
    </picture>
  );
};

export default Photo;
