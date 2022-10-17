import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ to, text }) => {
  return (
    <div className="grid">
      <Link className="text-sm text-blue-700 font-semibold" to={to}>
        {text}
      </Link>
    </div>
  );
};

export default FormLink;
