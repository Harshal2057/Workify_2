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

const ProfileSkills = () => {
  const addRef = useRef(null);

  const { url, fetchFreelancer, freelancer } = useContext(StoreContext);

  const [show, setShow] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

 
  
  useEffect(() => {
    if (freelancer?.skills) {
      setSkills(freelancer.skills);
    }
  }, [freelancer]);

  // handleKeyDown
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkills();
    }
  };

  // handleAddSkills
  const handleAddSkills = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
    }
    setNewSkill("");
  };
  

  // handleRemoveSkills
  const handleRemoveSkills = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post(
        `${url}/api/profile/freelancer/skills`,
        {skills:skills},
        {
          withCredentials: true,
        }
      );

      console.log(Response.data);

      if (Response.data.success) {
        toast.success("Skills updated successfully !!");
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
        // Form for Filling Skills
        <div className="w-full border rounded-2xl p-4  z-20  xl:bottom-6 bg-white">
          {/* Heading and Cross */}
          <div className="flex justify-between">
            <div>
              <p className="font-semibold text-2xl">Add Your Skills</p>
            </div>

            <div
              onClick={() => {
                setShow(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="text-3xl" />
            </div>
          </div>

          {/* Form for filing skills */}
          <form
            onSubmit={handleSubmit}
            className="border-3 border-dashed p-2 rounded-2xl"
          >
            {/* Skill input area along with button */}
            <div className="w-full flex gap-2">
              <input
                type="text"
                name=""
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-2 border-2 border-solid rounded-lg"
                placeholder="Enter a skill (e.g., React.js, UI Design)"
              />
              <button
                type="button"
                onClick={handleAddSkills}
                className="border-2 border-solid p-1 px-3 rounded-lg text-white bg-black font-semibold"
              >
                Add
              </button>
            </div>

            {/* Added skills display */}
            <div className="flex flex-wrap gap-2 m-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="w-max bg-black text-white border-2 border-solid p-2 px-3 rounded-full flex justify-center items-center gap-1"
                >
                  <span>{skill}</span>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-lg hover:text-orange-600"
                    onClick={() => handleRemoveSkills(skill)}
                  />
                </div>
              ))}
            </div>

            {/* Final Save Skill button */}
            <div className="w-max flex gap-1 items-center border-3 border-solid border-black  px-2 rounded-2xl hover:bg-black hover:text-white ">
              <button type="submit">
                <p className="font-semibold text-lg">Save Skills</p>
              </button>
            </div>
          </form>
        </div>
      ) : (
        //Actual Skill Display
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
            <p className="font-semibold text-2xl"> Skills </p>
          </div>

          {freelancer?.skills && freelancer.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 m-2">
              {freelancer.skills.map((skill, index) => (
                <div
                  key={index}
                  className="w-max bg-black text-white border-2 border-solid p-2 px-3 rounded-full flex justify-center items-center gap-1"
                >
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>
                Your skills are your greatest asset—why keep them hidden? By
                uploading your skills, you increase your chances of getting
                noticed by potential clients, employers, and collaborators who
                are actively looking for someone just like you. Show the world
                what you’re capable of! Upload your skills and let opportunities
                find you.
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

export default ProfileSkills;


