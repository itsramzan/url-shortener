import React from "react";

const FormCheckbox = ({ id, text, ...rest }) => {
  return (
    <div className="flex items-center gap-2">
      <input {...rest} id={id} required type="checkbox" />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {text}
      </label>
    </div>
  );
};

export default FormCheckbox;
