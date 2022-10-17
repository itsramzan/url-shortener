import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { username } = user || {};

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-full md:w-6/12 text-center space-y-4">
        {user ? (
          <>
            <h1 className="text-3xl md:text-6xl font-bold">
              Hey <span className="text-blue-700">{username}</span>
            </h1>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-6xl font-bold">
              URL <span className="text-blue-700">Shortener</span>
            </h1>
          </>
        )}

        <p className="text-sm text-gray-500 font-medium">
          Short your leanthy size URL & share with your friends, family & more.
          It's easy & totally free of cost!
        </p>

        <div className="flex justify-center items-center gap-4">
          <Link
            to={`${user ? "/shorten" : "/register"}`}
            className="text-sm text-blue-700 font-semibold border-2 border-blue-700 px-12 py-2 md:py-3 rounded-full hover:text-white hover:bg-blue-700"
          >
            {user ? "Short URL" : "Join Now"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
