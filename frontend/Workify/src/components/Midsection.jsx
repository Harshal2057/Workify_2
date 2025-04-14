import React from "react";
import { assets } from "../assets/assets";

const Midsection = () => {
  return (
    <div className="w-11/12 m-auto lg:flex">

       {/* LEFT SIDE  */}
      {/* IMAGE */}
      <div>
        <img
          src={assets.teamwork}
          className="m-5 ml-0 rounded-2xl lg:w-[400px] xl:w-[600px] "
        />
      </div>

        {/* RIGHT SIDE */}
      <div className="xl:w-3/6 xl:ml-5 xl:p-5">
        {/* INFO */}
        <div className="w-[350px] xl:w-[500px] text-center lg:mt-5 lg:w-[400px] lg:text-left">
          <div>
            <p className="font-bold text-3xl xl:text-5xl font-[Outfit]">
              Up your work game , It's easy
            </p>
          </div>

          <div className="mt-4 font-semibold lg:flex flex-col gap-5   text-xl ml-4 xl:text-3xl xl:font-normal font-[Outfit] ">
            <ul className="lg:list-disc">
              <li>
                <p>No cost to join</p>
              </li>
              <li>
                <p>Post a job and hire top talent</p>
              </li>
              <li>
                <p>Work with the best - without breaking the bank</p>
              </li>
            </ul>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-5 text-center lg:text-left">
          <button className="text-white font-semibold bg-black px-4 py-2 rounded-full hover:shadow-[inset_0_0_0_2px_black] hover:bg-white hover:text-black">
            Learn how to hire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Midsection;
