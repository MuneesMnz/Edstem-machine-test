import React from "react";

const Button = ({ children, handleClick }) => {
  return (
    <button onClick={handleClick} className="button">
      {children}
    </button>
  );
};

export default Button;
