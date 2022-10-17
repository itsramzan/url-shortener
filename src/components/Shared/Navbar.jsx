import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";
import { Link, NavLink, useHref } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import {
  IoDocumentsOutline,
  IoExitOutline,
  IoEnterOutline,
  IoLinkOutline,
  IoReaderOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import apiSlice from "../../features/api/apiSlice";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const href = useHref();

  useEffect(() => {
    setIsVisible(false);
  }, [href]);

  return (
    <div className="col-span-12 sticky top-0 z-50 h-16 shadow-nav flex justify-between items-center px-4 bg-white md:bg-transparent md:backdrop-blur-md md:px-32">
      <Logo />
      <Links isVisible={isVisible} />
      <Bar isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-4">
    <img className="h-full w-8" src={logoImage} alt="" />
    <h3 className="text-xl text-primary font-bold ">
      URL <span className="text-blue-700">Shortener</span>
    </h3>
  </Link>
);

const Links = ({ isVisible }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserLoggedout = (e) => {
    e.preventDefault();
    dispatch(userLoggedOut());
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <div
      className={`flex flex-col fixed top-[64px] ${
        isVisible ? "left-[0%]" : "left-[-100%]"
      } transition-all delay-200 bottom-0 w-full h-screen bg-white p-4 gap-2 md:static md:bg-transparent md:h-auto md:w-auto md:flex md:flex-row md:item-center md:gap-8`}
    >
      {user ? (
        <>
          <LinkItem to="/shorten" title="Shorten" Icon={IoLinkOutline} />
          <LinkItem to="/list" title="List" Icon={IoDocumentsOutline} />
          <LinkItem
            to="/logout"
            title="Logout"
            Icon={IoExitOutline}
            onClick={handleUserLoggedout}
          />
        </>
      ) : (
        <>
          <LinkItem to="/login" title="Login" Icon={IoEnterOutline} />
          <LinkItem to="/register" title="Register" Icon={IoReaderOutline} />
        </>
      )}
    </div>
  );
};

const LinkItem = ({ to, title, Icon, ...rest }) => (
  <NavLink
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-2 text-blue-700 font-semibold"
        : "flex items-center gap-2"
    }
    to={to}
    {...rest}
  >
    {<Icon />}
    {title}
  </NavLink>
);

const Bar = ({ isVisible, setIsVisible }) => (
  <div className="flex md:hidden">
    {isVisible ? (
      <IoClose
        className="text-primary text-2xl cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      />
    ) : (
      <IoMenu
        className="text-primary text-2xl cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      />
    )}
  </div>
);

export default Navbar;
