import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../context/StoreContext.jsx";

const Accounttype = () => {

    const{url}= useContext(StoreContext);

    const navigate = useNavigate();

    const[role , setRole] = useState(null);

    const handleRole = (role) => {

        setRole(role)
        console.log(role);

    }

    const handleSubmitRole = async(e) => {

      e.preventDefault();

      if (!role) {
        toast.error("Select the role first");
        return;
      }

      try {

        const token = localStorage.getItem("token");

        const response = await axios.put(`${url}/api/user/updateAccount`,
          {account:role},

          { withCredentials: true } 

        )
        console.log(response.data);
        toast.success("Account type updated successfully!");

        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message)
      }

    }



  return (
    <div className="w-full p-5 ">
      <div className="w-5/6 m-auto p-5 text-center ">
        <div>
          <p className="font-[Outfit] font-bold text-3xl">
            Join as a Client or Freelancer
          </p>
        </div>

        <form onSubmit={handleSubmitRole} className="flex flex-col gap-5 mt-5  items-center">
          <div className="flex flex-col lg:flex-row gap-5 mt-5 ">
            <div className={`flex flex-col p-1 justify-between border border-black rounded-3xl ${role === "client" ? "border-4 border-blue-600 xl:border-black scale-105" : null}`}>
              <div className="flex flex-col gap-2 items-center p-3">
                <FontAwesomeIcon icon={faUserTie} />
                <label htmlFor="client" onClick={() => handleRole("client")}>
                    <p> I'm a Client , hiring for project</p>
                  <input type="radio" name="accountType" id="client" value="client"/>
                </label>
              </div>

             
            </div>

            <div className={`flex flex-col p-1 justify-between border border-black rounded-3xl ${role === "freelancer" ? "border-4 border-blue-600 xl:border-black scale-105" : null}`}>
              <div className="flex flex-col gap-2 items-center p-3">
                <FontAwesomeIcon icon={faUserTie} />
                <label htmlFor="freelancer" onClick={() => handleRole("freelancer")}>
                 <p>I'm a Freelancer , looking for a work</p> 
                 <input type="radio" name="accountType" id="freelancer" value="freelancer" />
                </label>
              </div>
            </div>
          </div>

          <div className="border-1 border-black rounded-full py-2 px-4 text-xl text-white font-[Outfit] bg-black hover:bg-white hover:text-black hover:shadow-[inset_0_0_0_2px_black]">
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Accounttype;
