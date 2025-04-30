import React, { useContext, useRef, useState } from "react";
import { Player } from "@lordicon/react"; /// => LORD-ICON
import Lottie from "lottie-react"; /// => LORD-ICON
import axios from "axios";
import { toast } from "react-toastify";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import add_button from "../assets/add_button.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      {show ? (
        <div className="w-full border rounded-2xl p-4  z-20  xl:bottom-6 bg-white">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-2xl">Add About Yourself</p>
            </div>

            <div
              onClick={() => {
                setShow(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-3xl" />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
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
      ) : (
        <div
          className="w-full rounded-2xl p-6  bg-gray-200  flex flex-col gap-2 "
          style={{
            outline: "3px dashed black",
            outlineOffset: "-15px",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <div>
            <p className="font-semibold text-2xl"> About </p>
          </div>

          {freelancer?.about || (
            <p>
              Start with the basics. Filling out this sections will help you be
              discovered by recruiters and people you may know, You can write
              about your years of experience, industry, or skills. People also
              talk about their achievements or previous job experiences.
            </p>
          )}

          <button
            onClick={() => setShow(true)}
            className="w-max border-3 border-solid border-black p-1 px-2 rounded-2xl hover:bg-black hover:text-white"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileAbout;
