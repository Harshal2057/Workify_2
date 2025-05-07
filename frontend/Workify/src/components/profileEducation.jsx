import React, { useContext, useRef, useState , useEffect } from "react";
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

const ProfileEducation = () => {
  const addRef = useRef(null);

  const { url, fetchFreelancer, freelancer } = useContext(StoreContext);

  const [show, setShow] = useState(false);
  const [newEdu, setnewEdu] = useState("");
  const [education, seteducation] = useState([]);

 
  
  useEffect(() => {
    if (freelancer?.education) {
      seteducation(freelancer.education);
    }
  }, [freelancer]);

  // handleKeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddeducation();
    }
  };

  // handleAddeducation
  const handleAddeducation = () => {
    const trimmedEdu = newEdu.trim();
    if (trimmedEdu && !education.includes(trimmedEdu)) {
      seteducation([...education, trimmedEdu]);
    }
    setnewEdu("");
  };
  

  // handleRemoveeducation
  const handleRemoveeducation = (skillToRemove) => {
    seteducation(education.filter((skill) => skill !== skillToRemove));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post(
        `${url}/api/profile/freelancer/xtraDetails`,
        {education:education},
        {
          withCredentials: true,
        }
      );

      console.log(Response.data);

      if (Response.data.success) {
        toast.success("education updated successfully !!");
        setShow(false);
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
        // Form for Filling education
        <div className="w-full border rounded-2xl p-4  z-20  xl:bottom-6 bg-white">
          {/* Heading and Cross */}
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-2xl">Add Your education</p>
            </div>

            <div
              onClick={() => {
                setShow(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-3xl" />
            </div>
          </div>

          {/* Form for filing education */}
          <form
            onSubmit={handleSubmit}
            className="border-3 border-dashed p-2 rounded-2xl"
          >
            {/* Skill input area along with button */}
            <div className="w-full flex gap-2">
              <input
                type="text"
                name=""
                value={newEdu}
                onChange={(e) => setnewEdu(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-2 border-2 border-solid rounded-lg"
                placeholder="Enter a skill (e.g., React.js, UI Design)"
              />
              <button
                type="button"
                onClick={handleAddeducation}
                className="border-2 border-solid p-1 px-3 rounded-lg text-white bg-black font-semibold"
              >
                Add
              </button>
            </div>

            {/* Added education display */}
            <div className="flex flex-wrap gap-2 m-2">
              {education.map((skill, index) => (
                <div
                  key={index}
                  className="w-max bg-black text-white border-2 border-solid p-2 px-3 rounded-full flex justify-center items-center gap-1"
                >
                  <span>{skill}</span>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-lg hover:text-orange-600"
                    onClick={() => handleRemoveeducation(skill)}
                  />
                </div>
              ))}
            </div>

            {/* Final Save Skill button */}
            <div className="w-max flex gap-1 items-center border-3 border-solid border-black  px-2 rounded-2xl hover:bg-black hover:text-white ">
              <button type="submit">
                <p className="font-semibold text-lg">Save education</p>
              </button>
            </div>
          </form>
        </div>
      ) : (
        //Actual Skill Display
        <div
          className="w-full rounded-2xl p-6  bg-gray-200  flex flex-col gap-2 "
          style={{
            outline: "3px dashed grey",
            outlineOffset: "-15px",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <div>
            <p className="font-semibold text-2xl"> education </p>
          </div>

          {freelancer?.education && freelancer.education.length > 0 ? (
            <div className="flex flex-col flex-wrap gap-2 m-2">
              {freelancer.education.map((education, index) => (
                <div
                  key={index}
                  className="w-max bg-black text-white border-2 border-solid p-2 px-3 rounded-full flex justify-center items-center gap-1"
                >
                  <span>{education}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>
              A strong education section adds credibility to your profile and increases your chances of landing the right opportunities. Whether it’s a degree, certification, or specialized training, every learning experience counts!

Don't miss out—update your education details today and make your profile stand out! 🎓🚀
              </p>
            </div>
          )}

          <button
            onClick={() => setShow(true)}
            className="w-max border-3 border-solid border-black p-1 px-2 rounded-2xl hover:bg-black hover:text-white"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileEducation;


