import React from "react";

const Form = ({ children, ...rest }) => {
  return (
    <form {...rest} className="space-y-4">
      {children}
    </form>
  );
};

export default Form;
