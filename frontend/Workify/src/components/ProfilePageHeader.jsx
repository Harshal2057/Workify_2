import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPen,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../context/StoreContext.jsx";
import { assets } from "../assets/assets.js";
// import { useNavigate } from "react-router-dom";

import Profile_picUpload from "./Profile_picUpload.jsx";
import Back_picUpload from "./Back_picUpload.jsx";

const ProfilePageHeader = () => {
  const { freelancer } = useContext(StoreContext);

  // const navigate = useNavigate();

  // const [open, setOpen] = useState(false);
  const [updateProfile_pic, setUpdateProfile_pic] = useState(false);
  const [updateBack_pic , setUpdateBack_pic] = useState(false);

  // function navigateTo() {
  //   navigate("/edit-background");
  // }

  function handleProfileClick() {
    // navigate("/edit-profilepic")
    setUpdateProfile_pic(true);
  }

  return (
    <div className="w-full lg:h-[690px] xl:h-screen pt-10 lg:pt-20 bg-gray-100 flex justify-center p-5 relative ">
      <div
        className={`w-11/12 lg:w-5/6 lg:h-[684px] xl:h-full bg-gray-200 rounded-2xl absolute ${
          updateProfile_pic || updateBack_pic ? "blur-sm" : ""
        }`}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        {/* Background */}
        <div className="w-full md:h-3/6 lg:h-4/6 rounded-t-2xl overflow-hidden border-5 border-solid border-black">
          <div className="w-full lg:h-full">
            <img
              src={freelancer?.backgroundPic || assets.default_background_img}
              className="w-full h-full "
              alt="Background"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div
          className="absolute left-8 transform -translate-y-1/2 "
          onClick={handleProfileClick}
        >
          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-42 lg:h-42 rounded-full overflow-hidden border-4 border-white">
            <img
              src={freelancer?.profilePicUrl || assets.default_profile_icon}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="relative lg:top-10 pt-12 px-8 pb-6 flex justify-between">
          <div>
            {/* Name */}
            <div className="font-semibold text-xl mb-1">
              <p>{freelancer?.fullName || "Loading..."}</p>
            </div>

            {/* Email */}
            <div className="text-blue-500 flex items-center gap-1 mb-1">
              <FontAwesomeIcon icon={faEnvelope} />
              <a href={`mailto:${freelancer?.email}`}>
                {freelancer?.email || "Loading..."}
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{freelancer?.location || "Not specified"}</p>
            </div>
          </div>

          <div className="h-full bg-black border-2  border-solid border-black p-1 px-2 rounded-full hover:bg-white ">
            <FontAwesomeIcon
              icon={faPen}
              className="text-white hover:text-black"
            />
          </div>
        </div>

        {/* Edit Button */}
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={() => {setUpdateBack_pic(true)}}
        >
          <FontAwesomeIcon icon={faPen} className="text-gray-600" />
        </button>
      </div>

      <div className="absolute w-full h-auto z-40">
        {updateProfile_pic ? <Profile_picUpload setUpdateProfile_pic={setUpdateProfile_pic} /> : null}
      </div>

      <div className="absolute w-full h-auto z-40">
        {updateBack_pic ? <Back_picUpload setUpdateBack_pic={setUpdateBack_pic} /> : null}
      </div>
    </div>
  );
};

export default ProfilePageHeader;
