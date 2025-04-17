import React, { useContext, useRef, useState, useEffect } from "react";
import { Player } from "@lordicon/react"; /// => LORD-ICON
import Lottie from "lottie-react"; /// => LORD-ICON
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesome
import {
  faBars,
  faXmark,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

//Local Imports
import { assets } from "../assets/assets.js";
import searchIcon from "../assets/search_icon.json";
import { StoreContext } from "../context/StoreContext.jsx";
import Auth from "../pages/Auth.jsx";

const Navbar = () => {
  const searchRef = useRef(null);
  const hamRef = useRef(null);

  const [bars, setBars] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token, setShowLogin, logOut } = useContext(StoreContext);

  useEffect(() => {
    if (isOpen) {
      gsap.to(hamRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(hamRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [isOpen]);

  return (
    <>
      <div className="w-full">
        <div className=" w-auto px-12 m-auto p-2 sm:flex justify-between bg-black ">
          {/* Left side */}
          <div className="flex justify-center items-center">
            <Link to="/">
            <div>
              <img src={assets.Workify_logo} className="w-20 p-2 mx-10" />
            </div>
            </Link>
           

            <div className="hidden xl:flex gap-9 text-gray-400 font-[Outfit]">
              <div className="hover:text-white">
                <p>Find Work</p>
              </div>
              <div className="hover:text-white">
                <p>Find Talent</p>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Right side */}
            <div className="flex items-center gap-9">
              <div className="flex items-center px-3 bg-white rounded-4xl">
                <div
                  onMouseEnter={() => searchRef.current?.goToAndPlay(0)}
                  className="w-10 h-10"
                >
                  <Lottie
                    animationData={searchIcon}
                    lottieRef={searchRef}
                    style={{ width: 35, height: 35 }}
                    loop={false}
                    autoplay={false} // Prevent auto-start
                  />
                </div>

                <div className="text-custom-grey text-lg font-[Outfit]">
                  <input
                    type="text"
                    placeholder="what are you looking for ?"
                    name="searchbar"
                    className="focus:outline-none"
                  />
                </div>
              </div>

              {/* SIGN UP USER-ICON */}
              {!token ? (
                <Link to="/auth">
                  <div className="hidden sm:block bg-gray-200 font-semibold text-xl rounded-4xl px-3 py-2 font-[Outfit] hover:bg-white">
                    <button>Sign up</button>
                  </div>
                </Link>
              ) : (
                <div className="relative group">
                {/* Profile Icon */}
                
                <div className="text-white hidden lg:block text-2xl border-2 border-white p-1 px-2 rounded-full hover:bg-white hover:text-black">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                
                
                <div className="absolute z-10 right-1 top-full invisible group-hover:visible">
                 
                  <div className="h-2 w-full"></div>
                  
                  <ul className="w-32 bg-white shadow-md rounded-lg">
                    <Link to="/profilePage">
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <FontAwesomeIcon icon={faUser} />
                      <p>Profile</p>
                    </li>
                    </Link>
                    <hr />
                    <li
                      onClick={logOut}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
              )}
              {/* SIGN UP USER-ICON */}
            </div>
          </div>
        </div>

        <div className="w-3/5 border-black"></div>

        {/* HAMBURGER ICON */}
        <div
          className="block absolute top-16 left-3 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon
            icon={isOpen ? faXmark : faBars}
            className="text-white"
            size="2xl"
          />
        </div>

        {/* SLIDEBAR */}
        <div
          ref={hamRef}
          id="hamburger"
          className="w-[100%] text-white absolute top-23 left-[100%] p-5 font-[Outfit] flex flex-col gap-4 mt-4 z-10 bg-black lg:hidden"
        >
          {!token && (
            <Link to="/auth">
              <div onClick={() => setIsOpen(false)}>
                <button>Sign Up</button>
              </div>
            </Link>
          )}

          {!token && (
            <Link to="/auth">
              <div onClick={() => setIsOpen(false)}>
                <button>Log in</button>
              </div>
            </Link>
          )}

          {token && (
            <Link to="/profilePage">
            <div onClick={() => setIsOpen(false)}>
              <button>Profile</button>
            </div>
            </Link>
          )}

          {token && (
            <div onClick={logOut}>
              <button>LogOut</button>
            </div>
          )}

          <div>
            <button>Find Talent</button>
          </div>

          <div>
            <button>Find Work</button>
          </div>
        </div>
        {/* HAMBURGER ENDS */}
      </div>
    </>
  );
};

export default Navbar;
