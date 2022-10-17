import React from "react";

const FormTextarea = ({ id, text, ...rest }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold" htmlFor={id}>
        {text}
      </label>
      <div className="flex items-center relative">
        <textarea
          className="w-full text-sm font-semibold p-2 rounded-md transition duration-500 ring-2 ring-gray focus:ring-primary"
          {...rest}
          id={id}
          placeholder={text}
          spellCheck="false"
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
};

export default FormTextarea;
