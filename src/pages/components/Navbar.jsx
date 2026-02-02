import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import darkIcon from "../../assets/darkIcon.svg";
import lightIcon from "../../assets/lightIcon.svg";
import useSignout from "../../hooks/useSignout";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let searchValue = params.get("search")
  
  let [search, setSearch] = useState(searchValue);
  let navigate = useNavigate();
  let searchHandler = (e) => {
    navigate("/?search=" + search);
    
  };
  let { isDark, changeTheme } = useTheme();
  let { logOut } = useSignout();
  let logOutForm = async () => {
    await logOut();
    navigate("/login");
  };

  let { user } = useContext(AuthContext);
  return (
    <nav className={`border-b ${isDark ? "bg-dbg" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-3 py-3">
        <ul className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Row 1: Search (mobile full width) */}
          <li className="flex items-center gap-2 w-full md:w-[420px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 shrink-0 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="search books..."
              className={`w-full outline-none px-3 py-2 rounded-xl border ${
                isDark
                  ? "bg-transparent text-white placeholder-white/70 border-white/20"
                  : "bg-white text-gray-800 placeholder-gray-400 border-gray-200"
              }`}
            />
            <button
              onClick={searchHandler}
              className="shrink-0 text-white bg-primary px-3 py-2 rounded-xl flex items-center gap-1"
            >
              <span className="hidden md:block">Search</span>
              <span className="md:hidden">Go</span>
            </button>
          </li>

          {/* Row 2: Brand (center on desktop, left on mobile) */}
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 md:mx-auto cursor-pointer"
          >
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-700"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>

            <span className="text-xl md:text-2xl font-bold text-primary">
              Book Library
            </span>
          </Link>

          {/* Row 3: Actions */}
          <li className="flex items-center justify-between md:justify-end gap-3">
            {/* create book */}
            <Link
              to="/create"
              className="text-white bg-primary px-3 py-2 rounded-xl flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="hidden md:block">Create book</span>
              <span className="md:hidden">Create</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* profile image */}
              <div className="w-10 md:w-11">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/056/673/911/non_2x/businessman-avatar-in-circle-icon-businessman-profile-avatar-illustration-vector.jpg"
                  alt=""
                  className="w-full rounded-full"
                />
              </div>

              {/* theme toggle */}
              <div className="cursor-pointer">
                {isDark && (
                  <img
                    src={lightIcon}
                    alt=""
                    className="w-8"
                    onClick={() => changeTheme("light")}
                  />
                )}
                {!isDark && (
                  <img
                    src={darkIcon}
                    alt=""
                    className="w-8 filter brightness-0"
                    onClick={() => changeTheme("dark")}
                  />
                )}
              </div>

              {/* auth buttons */}
              <div className="flex items-center gap-2">
                {!user && (
                  <>
                    <Link
                      to={"/login"}
                      className={`rounded-xl px-3 py-2 border ${
                        isDark
                          ? "border-primary text-white"
                          : "border-primary text-gray-800"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to={"/register"}
                      className="text-white bg-primary rounded-xl px-3 py-2"
                    >
                      Register
                    </Link>
                  </>
                )}
                {!!user && (
                  <button
                    onClick={logOutForm}
                    className="text-white bg-red-500 rounded-xl px-3 py-2 cursor-pointer"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
