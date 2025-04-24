import React , {useContext, useRef, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { assets } from "../assets/assets";

const Profile_picUpload = ({setUpdateProfile_pic}) => {

  const inputRef = useRef();

  const {url , fetchFreelancer , freelancer} = useContext(StoreContext);

  const navigate = useNavigate();

  const[image , setImage] = useState(null);
  const[isLoading , setIsLoading] = useState(null);

  function handleButton() {
    inputRef.current.click();
  }

  const handleChangeImg = (e) => {

    const file =e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file))
    }

  }

  const handleApply = async() => {

    if (!inputRef.current.files[0]) {
        toast.error("Upload the files first !!");
        return
    }

    setIsLoading(true);

    try {
      
      const formData = new FormData();

      formData.append("imageFile" , inputRef.current.files[0]);

     const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
     }

     const Response = await axios.post(`${url}/uploadImg/profile` , formData , config);

     if (Response.data.success) {
      toast.success("Profile Pic uploaded successfully")

      await fetchFreelancer();

      setUpdateProfile_pic(false)
     }

    } catch (error) {
        console.log("Full error:", error);
            console.log("Response data:", error.response?.data);
            toast.error(error.response?.data?.message || "Error uploading image");
    }finally{
      setIsLoading(false);
    }

  }

  return (
    <div className="mt-20 w-full lg:h-screen flex justify-center items-center">
      <div className="border-3 border-solid border-black w-4/6 lg:w-3/6  text-center items-center lg:text-left rounded-2xl shadow-2xl" >
       <div className="w-full flex justify-between bg-black p-2 rounded-tr-xl rounded-tl-xl">
       <div>
          <p className="font-semibold text-white  text-2xl"> Profile Pic</p>
        </div>

        <div onClick={() => {setUpdateProfile_pic(false)}}>
          <FontAwesomeIcon icon={faXmark} className="text-white text-3xl" />
        </div>
       </div>
      
        
        <div className="lg:flex flex-col justify-center items-center mt-5">
          <div className="flex justify-center  w-max lg:block border-3 border-solid border-red-500 rounded-full">
            <img src={ image || freelancer?.profilePicUrl || assets.default_profile_icon} alt="" className="rounded-full w-[250px] h-[250px] " />
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between gap-3 w-2/6 items-center mt-5 mb-5 mx-auto lg:items-start lg:mx-0  lg:max-h-max ">
            <button className="border-3 border-solid border-black p-1 px-2 rounded-full hover:bg-black hover:text-white" onClick={handleButton} disabled={isLoading}>
              <p className="font-semibold">Upload</p>
            </button>

            <input type="file"  accept="image/*" className="hidden" ref={inputRef} onChange={handleChangeImg} />
            
            <button className="border-3 border-solid border-black p-1 w-max rounded-full  hover:bg-black hover:text-white" onClick={handleApply} disabled={isLoading}>
              <p className="font-semibold">{isLoading ? "Updating.." : "Apply Changes"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_picUpload;