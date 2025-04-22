import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const Back_picUpload = () => {

  const { freelancer , url , fetchFreelancer } = useContext(StoreContext);
  const navigate = useNavigate();

  const[isLoading , setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const inputFileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleButton = () => {
    inputFileRef.current.click();
  };

  const handleChange = async() => {

    setIsLoading(true);

    if (!inputFileRef.current.files[0]) {
      alert("Please upload the files !!");
      return;
    }

    try {
      
      const formData = new FormData();

      formData.append("imageFile" , inputFileRef.current.files[0]);
  
      const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      };
  
      const Response = await axios.post(`${url}/uploadImg/background` , formData , config);
  
      console.log(Response);

      if (Response.data.success) {
        toast.success("Background Image uploaded successfully !!")

        //updating freelancer data in react
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
    <div className="w-full h-screen  flex justify-center items-center">
      {/* Actual Container */}
      <div className="border-1 border-solid border-black mt-17 p-3 w-5/6 lg:w-3/6 h-auto rounded-2xl flex flex-col gap-3">

      {/* Heading */}
        <div>
          <p className="font-semiBold text-2xl">Update Background Image</p>
        </div>

      {/* Photo Preview */}
        <div className=" w-full mt-5 p-2">
        <div className="w-full h-42 lg:h-72 mt-2">
              <img
                src={image || freelancer?.backgroundPic || assets.default_background_img}
                alt="Preview"
                className="w-full h-full rounded-2xl "
              />
            </div>
        </div>

      {/* Buttons */}
        <div className="flex gap-5 justify-end">
            <button className="border-2 border-solid border-black p-1 rounded-full  hover:bg-black hover:text-white" onClick={handleButton} disabled={isLoading}>
                <p className="font-semibold">Upload Image</p>
            </button>

            <input type="file" accept="image/*" name="imageFile" onChange={handleImage} className="hidden" ref={inputFileRef} />

            <button className="border-2 border-solid border-black p-1 rounded-full hover:bg-black hover:text-white" onClick={handleChange} disabled={isLoading}>
              <p className="font-semibold">{isLoading ? "Updating...":"Apply Changes" }</p>
            </button>

        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Back_picUpload;
