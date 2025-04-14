import React from "react";
import { assets } from "../assets/assets.js";

const Herosection = () => {
  return (
    <>

    <div className="w-full  xl:min-h-screen bg-gray-200 m-0 mt-0">

    <div className="w-11/12 flex flex-col lg:flex-row   mx-auto">
        {/* Left Side */}
        <div className="w-full md:w-4/6 lg:w-1/2 p-8 sm:mt-25">
          <div className="w-full">
            <p className="text-4xl md:text-5xl lg:text-6xl pl-4 font-semibold font-[Outfit]">
              Hire the best Freelancer for any job online
            </p>
            <ul className="list-disc text-lg md:text-xl lg:text-2xl mt-4 pl-6">
              <li>World's largest Freelance market</li>
              <li>Any job you can possibly think of</li>
              <li>Save up to 90% & get quotes for free</li>
              <li>Pay only when you're 100% happy</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 pl-4">
            <button className="text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-black font-[Outfit] border-2 border-black rounded-3xl px-4 py-2 hover:shadow-[inset_0_0_0_2px_black] hover:bg-white hover:text-black">
              Hire
            </button>
            <button className="text-xl md:text-2xl lg:text-3xl font-semibold text-white bg-black font-[Outfit] border-2 border-black rounded-3xl px-4 py-2 hover:shadow-[inset_0_0_0_2px_black] hover:bg-white hover:text-black">
              Get Hired
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative lg:absolute lg:right-5 lg:top-40 w-full md:w-4/6 lg:w-3/6">
          {/* Background */}
          <div className="w-[90%] h-[90%]  absolute left-5 bottom-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-5 rounded-full"></div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 justify-center relative z-10 lg:absolute lg:top-14">
            <div className="flex items-center bg-gray-50 rounded-2xl p-2">
              <img src={assets.google} className="w-10" />
              <div>
                <p className="font-semibold">UI/UX DESIGN</p>
                <p className="font-light">GOOGLE</p>
              </div>
            </div>

            <div className="flex items-center z-10 bg-gray-50 relative top-60 lg:left-36 xl:left-96 rounded-2xl p-2 ">
              <img src={assets.insta} className="w-10" />
              <div>
                <p className="font-semibold">Content Creation</p>
                <p className="font-light">Instagram</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative bottom-5 z-6">
            <img
              src={assets.Hero_sec}
              className="w-full max-w-sm md:max-w-lg lg:max-w-2xl"
            />
          </div>
        </div>
      </div>

    </div>

     


    {/* Trysted by */}
      <div className='w-11/12 mt-5 sm:mt-10 m-auto xl:mt-10 '>

          
            <div className='ml-9'>
                <p className='text-black text-lg font-bold'>Trusted By</p>
            </div>

            <div className='w-full m-auto flex justify-around items-center  bg-gray-200 rounded-2xl'>
                    <img src={assets.mit} className='size-[4rem]' />
                    <img src={assets.google} className='size-[4rem]' />
                    <img src={assets.airbnb} className='size-[3rem]' />
                    <img src={assets.microsoft} className='size-[4rem]' />
                    <img src={assets.nvidia} className='size-[4rem]' />

            </div>

        </div>
    </>
  );
};

export default Herosection;
