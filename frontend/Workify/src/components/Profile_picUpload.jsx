import React , {useContext, useRef, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";

const Profile_picUpload = () => {

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

      navigate("/profilePage")
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
      <div className="border-1 border-solid border-black w-4/6 lg:w-3/6 p-2 text-center items-center lg:text-left">
        <div>
          <p className="font-semibold text-2xl">Upload Profile Pic</p>
        </div>
        
        <div className="lg:flex justify-center">
          <div className="flex justify-center lg:block border-3 border-solid border-red-500 rounded-full">
            <img src={ image || freelancer?.profilePicUrl || assets.default_profile_icon} alt="" className="rounded-full w-[250px] h-[250px] " />
          </div>
          
          <div className="flex flex-col gap-3 items-center mt-5 mx-auto lg:items-start lg:mx-0 lg:max-h-max  border-1 border-solid border-black">
            <button className="border-1 border-solid border-black p-1 px-2 rounded-full hover:bg-black hover:text-white" onClick={handleButton} disabled={isLoading}>
              <p className="font-semibold">Upload</p>
            </button>

            <input type="file"  accept="image/*" className="hidden" ref={inputRef} onChange={handleChangeImg} />
            
            <button className="border-1 border-solid border-black p-1 rounded-full  hover:bg-black hover:text-white" onClick={handleApply} disabled={isLoading}>
              <p className="font-semibold">{isLoading ? "Updating.." : "Apply Changes"}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_picUpload;