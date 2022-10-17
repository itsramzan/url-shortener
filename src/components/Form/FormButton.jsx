import React from "react";

const FormButton = ({ text, ...rest }) => {
  return (
    <div className="flex">
      <button
        {...rest}
        className="text-sm text-blue-700 font-semibold border-2 border-blue-700 px-12 py-2 md:py-3 rounded-full hover:text-white hover:bg-blue-700"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default FormButton;
