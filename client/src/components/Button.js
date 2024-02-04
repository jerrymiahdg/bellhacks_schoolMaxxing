import { useState } from "react";

const Button = ({ children, onClick, valid }) => {
  return (
    <button
      className={`button ${valid ? "" : "invalid"}`}
      onClick={valid ? onClick : null}
    >
      {children}
    </button>
  );
};

export default Button;
