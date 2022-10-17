import React from "react";

const FormControll = ({
  text,
  IconLeft,
  IconRight,
  passwordVisibility,
  handlePasswordVisibility,
  ...rest
}) => {
  return (
    <div className="space-y-2 flex-1">
      <div className="flex items-center relative">
        <IconLeft className="absolute" />
        <input
          className="w-full text-sm font-semibold px-6 py-2 transition duration-500 border-b-2 border-gray-200 focus:border-blue-700"
          {...rest}
          placeholder={text}
          spellCheck="false"
          autoComplete="off"
          required
        />
        {IconRight && (
          <IconRight
            className="absolute right-0 cursor-pointer"
            onClick={() => handlePasswordVisibility(!passwordVisibility)}
          />
        )}
      </div>
    </div>
  );
};

export default FormControll;
