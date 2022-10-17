import React from "react";
import notFoundSvg from "../assets/images/notFound.svg";

const NotFound = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-7/12 md:w-5/12 text-center space-y-4">
        <img src={notFoundSvg} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
