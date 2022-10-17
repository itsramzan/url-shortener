import React from "react";

const BannerFormLayout = ({ banner, children }) => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-10/12 grid grid-cols-12 items-center md:gap-16">
        <div className="col-span-6 hidden md:flex">
          <img src={banner} alt="" />
        </div>

        <div className="col-span-12 md:col-span-6">{children}</div>
      </div>
    </div>
  );
};

export default BannerFormLayout;
