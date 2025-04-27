import React, { useContext, useRef, useState } from "react";
import { Player } from "@lordicon/react"; /// => LORD-ICON
import Lottie from "lottie-react"; /// => LORD-ICON
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import add_button from "../assets/add_button.json";

const ProfileAbout = () => {
  const addRef = useRef(null);

  const { url, fetchFreelancer, freelancer } = useContext(StoreContext);

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    about: "",
  });

  const handleChange = (e) => {
    setData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post(
        `${url}/api/profile/freelancer/skills`,
        { about: data.about },
        {
          withCredentials: true,
        }
      );

      console.log(Response.data);

      if (Response.data.success) {
        toast.success("About section updated successfully !!");
        setShow(false);
        setData({ about: "" });
        fetchFreelancer();
      }
    } catch (error) {
      console.error("Error while updating about =>", error);
      alert("Failed to update about section.");
    }
  };

  return (
    <div>
      <div
        className={` bg-gray-200 p-5 rounded-2xl ${show ? "blur-sm" : ""}`}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <div className="w-full border-3 border-dashed rounded-2xl border-black p-2 ">
          {/* Heading */}
          <div className="w-max font-semibold text-2xl border-b-3 border-solid border-black mb-3 ">
            <p>About Us</p>
          </div>

          {/* Placeholder and button */}
          <div className="flex flex-col gap-2">
            {freelancer?.about || (
              <p>
                Your skills are your greatest asset—why keep them hidden? By
                uploading your skills, you increase your chances of getting
                noticed by potential clients, employers, and collaborators who
                are actively looking for someone just like you. Show the world
                what you’re capable of! Upload your skills and let opportunities
                find you.
              </p>
            )}

            <button
              onClick={() => setShow(true)}
              className="w-max border-3 border-solid border-black p-1 px-2 rounded-2xl hover:bg-black hover:text-white"
            >
              Add
            </button>
          </div>
        </div>

      </div>

      {/* Form */}
        {show ? (
          <div className="w-5/6 border rounded-2xl p-4 absolute z-20 bottom-6 bg-white">

            <div>
              <p className="font-semibold text-2xl">Add About Yourself</p>
            </div>

            <form onSubmit={handleSubmit}
            className="border-3 border-dashed p-2 rounded-2xl"
            >
              <div className="w-full ">
                <textarea
                  onChange={handleChange}
                  name="about"
                  value={data.about}
                  placeholder="Your skills are your greatest asset—why keep them hidden? By uploading your skills, you increase your chances of getting noticed by potential clients, employers, and collaborators who are actively looking for someone just like you.

Show the world what you’re capable of! Upload your skills and let opportunities find you"
                  className="w-full focus:outline-none focus:ring-0 focus:border-none"
                  rows="4"
                ></textarea>
              </div>

              <div className="w-max flex gap-1 items-center border-3 border-solid border-black  px-2 rounded-2xl hover:bg-black hover:text-white ">
                <button type="submit">
                  <p className="font-semibold text-lg">Add</p>
                </button>
              </div>
            </form>
          </div>
        ) : null}

    </div>
  );
};

export default ProfileAbout;
