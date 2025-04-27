import React, { useState , useRef, useContext } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; //FontAwesome
import axios from 'axios'
import { useNavigate } from "react-router-dom";

//LOCAL
import { assets } from "../assets/assets.js";
import { StoreContext } from "../context/StoreContext.jsx";

const Auth = () => {

  const navigate = useNavigate();

  const{url , token , setToken , setShowLogin , fetchFreelancer} = useContext(StoreContext);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [type, setType] = useState("password");
  const [state, setState] = useState("SignUp");
  const [data , setData] = useState({
    fullname : "",
    email : "",
    password : "",
    terms : false
  })
 

  const handletype = (type) => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSetForm = (state) => {
    setState((prev) => (prev === "SignUp" ? "Login" : "SignUp"));
  };

  const handleDataChange = (e) => {
    const { name, type, checked, value } = e.target;

    setData((prev) => {
        const updatedData = {
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        };
        console.log(updatedData); // Now logs the correct state
        return updatedData;
    });
};

const handleSubmitData = async(event) => {

  event.preventDefault();

  if (!data.terms) {
    toast.error("You must accept the Terms and Conditions to proceed.");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("name" , data.fullname)
    formData.append("email" , data.email)
    formData.append("password" , data.password)

 
    let newUrl = url;

    if (state === "SignUp") {
      
      newUrl = newUrl + "/api/user/signUp"

    }else{

       newUrl = newUrl + "/api/user/login"

    }

    const response = await axios.post(newUrl , formData , {
      headers:{ "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token" , response.data.token)

      console.log(token)

      if (state === "SignUp") {
        
        toast.success("User Signed Up successfully")

      }else{

        toast.success("User logged in successfully")

      }

      await fetchFreelancer();

      if (state === "SignUp") {
        navigate("/accountType");
      }else{
        navigate("/");
      }
      

    }

  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message); // Show "User already registered!"
    } else {
      toast.error("Something went wrong, please try again.");
    }
  }


}

const handleGoogleLogin = () => {
  window.open("http://localhost:4000/auth/google", "_self");
}



  return ( <div className="w-full mt-20">
      <div className="w-5/6 border-1 p-5 border-black mt-4 m-auto rounded-4xl">
        {state === "SignUp" ? (
          <p className="font-bold font-[Outfit] text-3xl">Create Account</p>
        ) : (
          <p className="font-bold font-[Outfit] text-3xl">Welcome Back</p>
        )}

        {/* GOOGLE TWITTER */}
        <div className="w-full mt-2 p-3 flex flex-col gap-3 lg:flex-row ">
          <div className="border-1 border-black flex items-center justify-center rounded-full lg:w-3/6"
                onClick={handleGoogleLogin}
                >
            <img src={assets.google} className="w-1/6" />
            <p>{state} with google</p>
          </div>

          <div className=" border-1 border-black flex items-center justify-center rounded-full lg:w-3/6">
            <img src={assets.twitter} className="w-[22px] m-1 rounded-full lg:w-1/12" />
            <p>{state} with Twitter</p>
          </div>
        </div>

        <div className="w-5/6 m-auto flex items-center gap-2">
          <hr className="w-[120px] lg:w-[700px] text-gray-700" />
          <p className="font-[Outfit]">or</p>
          <hr className="w-[120px] lg:w-[700px] text-gray-700" />
        </div>

        {/* FORM */}

          <form onSubmit={handleSubmitData}>

          <div className="w-5/6 m-auto mt-5 flex flex-col items-center gap-4 ">
            {state === "SignUp" && (
              <div
               className=" lg:w-[50%] border-b border-black"
               onClick={() => fullNameRef.current?.focus()}
               >
                <input
                ref={fullNameRef}
                  type="text"
                  placeholder="fullname"
                  name="fullname"
                  value={data.fullname}
                  className="focus:outline-none"
                  onChange={handleDataChange}
                />
              </div>
            )}

            <div 
            className="lg:w-[50%] border-b border-black"
            onClick={() => emailRef.current?.focus()}
            >
              <input
              ref={emailRef}
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                className="focus:outline-none"
                onChange={handleDataChange}
              />
            </div>

            <div
             className="lg:w-[50%] border-b border-black flex items-center justify-between"
             onClick={() => passwordRef.current?.focus()}
             >
              <input
                ref={passwordRef}
                type={type}
                placeholder="password"
                autoComplete="new-password"
                name="password"
                value={data.password}
                className="focus:outline-none"
                onChange={handleDataChange}
              />
              <FontAwesomeIcon
                icon={type === "password" ? faEye : faEyeSlash}
                className="text-gray-700"
                onClick={() => {
                  handletype(type);
                }}
              />
            </div>

            <div>
              <input type="checkbox" checked={data.terms} name="terms" id="terms" className="mr-2" onChange={handleDataChange} />
              <label htmlFor="terms" className="text-gray-600">
                I agree to the Terms and Condition
              </label>
            </div>

            <div className="border-1 border-black text-center rounded-full py-2 px-7 font-semibold text-xl text-white bg-black hover:shadow-[inset_0_0_0_2px_black] hover:bg-white hover:text-black">
              {state === "SignUp" ? (
                <button type="submit"> Create Account </button>
              ) : (
                <button type="submit">Login </button>
              )}
            </div>

          </div>

          </form>

          <div className="flex gap-2 relative left-[15%] lg:left-[35%] xl:left-[40%] mt-1">
              {state === "SignUp" ? (
                <p className="font-light">already have an account,</p>
              ) : (
                <p className="font-light">new to Workify,</p>
              )}
              <button className="font-bold" onClick={() => handleSetForm(state)}>
                {state === "SignUp" ? "Login" : "SignUp"}
              </button>
            </div>
         
        

        {/* FORM ENDS */}
      </div>
    </div>
  );
};

export default Auth;
