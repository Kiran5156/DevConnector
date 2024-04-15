import React from "react";
import spinner from "./Spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{
        width: "150px",
        height: "150px",
        margin: "auto",
        display: "block",
      }}
      alt="...Loading"
    />
  );
};

export default Spinner;
