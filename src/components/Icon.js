import React from "react";
import iconMap from "../icons/icons";

function Icon({ iconName }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height={50} fill="#fff" >
      {iconMap[iconName]}
    </svg>
  );
}

export default Icon;
