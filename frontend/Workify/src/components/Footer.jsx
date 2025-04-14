import React, { useState } from "react";
import {
  assets,
  clientFooter,
  freeLancerFooter,
  follow,
} from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [toggle, setToggle] = useState({
    clients: false,
    freelancer: false,
  });

  const handleToggle = (user) => {
    setToggle((prev) => ({
      ...prev,
      [user]: !prev[user],
    }));
  };

  return (
    <div className="w-11/12  border-1 border-black m-auto p-5 lg:p-10 bg-black rounded-4xl">
      {/* FOR CLIENTS FREELANCER */}
      <div className="flex flex-col mb-5 text-left gap-10 text-white lg:flex-row ">
        {/* CLIENTS */}
        <div>
          {/* CLIENTS */}
          <p className="hidden font-[Outfit] lg:block ">For Clients</p>
          <div className="flex items-center justify-between lg:hidden">
            <button
              className="max-w-max font-[Outfit]"
              onClick={() => handleToggle("clients")}
            >
              For Clients
            </button>
            <FontAwesomeIcon
              icon={toggle.clients ? faCaretUp : faCaretDown}
              size="2x"
              color="white"
              onClick={() => handleToggle("clients")}
            />
          </div>

          {/* DROPDOWN LOGIC */}
          {toggle.clients ? (
            <div className="lg:hidden">
              {clientFooter.map((value, index) => {
                return (
                  <p key={index} className="text-gray-400">
                    {value}
                  </p>
                );
              })}
            </div>
          ) : null}

          {
            <div className="hidden lg:block">
              {clientFooter.map((value, index) => {
                return (
                  <p key={index} className="text-gray-400">
                    {value}
                  </p>
                );
              })}
            </div>
          }
        </div>

        <hr className="text-white lg:hidden" />

        {/* FREELANCER */}
        <div>
          {/* FREELANCER */}
          <p className="hidden lg:block font-[Outfit]">For Freelancer</p>
          <div className="flex items-center justify-between lg:hidden">
            <button
              className="max-w-max font-[Outfit]"
              onClick={() => handleToggle("freelancer")}
            >
              For Freelancer
            </button>
            <FontAwesomeIcon
              icon={toggle.freelancer ? faCaretUp : faCaretDown}
              size="2x"
              color="white"
              onClick={() => handleToggle("freelancer")}
            />
          </div>

          {/* DROPDOWN LOGIC */}
          {toggle.freelancer ? (
            <div className="lg:hidden">
              {freeLancerFooter.map((value, index) => {
                return (
                  <p key={index} className="text-gray-400">
                    {value}
                  </p>
                );
              })}
            </div>
          ) : null}

          {
            <div className="hidden lg:block">
              {freeLancerFooter.map((value, index) => {
                return (
                  <p key={index} className="text-gray-400">
                    {value}
                  </p>
                );
              })}
            </div>
          }
        </div>

        <hr className="text-white lg:hidden" />
      </div>

      <hr className="hidden lg:block text-white " />

      <div className="w-full mt-5 mb-5 lg:flex justify-between">
        {/* FOLLOW US */}
        <div className="lg:w-2/6">
          <div>
            <p className="font-[Outfit] text-white">Follow Us</p>
          </div>
          <div className="w-full flex ">
            {follow.map((value, index) => (
             
                <a key={index} href={value.url} target="_blank" className="w-5/6">
                  <img
                    src={value.img}
                    className="w-4/6 lg:w-[100px] xl:w-[50px]"
                    alt={value.desc}
                  />
                </a>
              
            ))}
          </div>
        </div>

        <hr className="text-white lg:hidden" />

        {/* DOWNLOAD */}
        {/* <div className="w-2/6 lg:flex flex-col ">
          <div>
            <p className="text-white font-[Outfit]">Download Now</p>
          </div>
          <div className="lg:w-full flex items-center">
            <div>
            
                <img src={assets.android} className="w-[350px] lg:w-3/6" />
              
            </div>

            <div>
            
                <img src={assets.apple} className="w-[550px] lg:w-3/6" />
              
            </div>
          </div>
        </div> */}
      </div>

        <hr className="hidden lg:block text-white" />

        <div className="text-center">
        <p className="text-gray-500 lg:text-2xl xl:text-xl">© 2015-2025 Workify® Global Inc.</p>
        </div>

    </div>
  );
};

export default Footer;
