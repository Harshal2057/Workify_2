import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const ImageUpload = () => {
  const { freelancer } = useContext(StoreContext);

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
  }

  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div className="border-1 border-solid border-black mt-17 w-3/6 h-auto rounded-2xl">
        <div>
          <p className="font-semiBold text-2xl">Update Background Image</p>
        </div>

        <div className=" w-full mt-5 p-2">
        <div className="w-full h-72 mt-2">
              <img
                src={image || freelancer?.backgroundPic}
                alt="Preview"
                className="w-full h-full rounded-2xl "
              />
            </div>
        </div>

        <div>
            <button className="border-1 border-solid border-black" onClick={handleButton}>
                <p>Upload Image</p>
            </button>

            <input type="file" accept="image/*" onChange={handleImage} className="hidden" ref={inputFileRef} />

        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ImageUpload;
