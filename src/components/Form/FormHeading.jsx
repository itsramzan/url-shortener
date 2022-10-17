import React from "react";

const FormHeading = ({ text, slogan }) => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl text-blue-700 font-bold">{text}</h1>
      <p className="text-sm text-gray-500 font-semibold">{slogan}</p>
    </div>
  );
};

export default FormHeading;
