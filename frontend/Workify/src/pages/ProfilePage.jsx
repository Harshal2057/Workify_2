import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPen, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { StoreContext } from '../context/StoreContext.jsx'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const { url } = useContext(StoreContext)
  const [freelancer, setFreelancer] = useState(null)
  const [back_img, setBack_img] = useState(null)
  const [profile_img, setProfile_img] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFreelancer = async() => {
      const token = localStorage.getItem("token")

      if (!token) {
        console.log("No token found, redirecting to login")
        // Add code to redirect to login page or handle no-token state
        navigate("/auth");
        return
      }else{
        console.log(`Token found => ${token}`);
        
      }

      try {
        const response = await axios.get("http://localhost:4000/get-profile/get-freelancer", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response.data.profile)
        setFreelancer(response.data.profile)
        setBack_img(response.data.profile.backgroundPic)
        setProfile_img(response.data.profile.profilePicUrl)
      } catch (error) {
        console.error(`Error occurred while fetching freelancer in frontend => ${error}`)

        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          console.log("Token expired, redirecting to login");
          localStorage.removeItem("token");
          navigate("/auth");
        }
      }
    }
    fetchFreelancer()
  } , [])

  return (
    <div className="w-full lg:h-screen pt-10 lg:pt-20 bg-gray-100 flex justify-center p-5">
      <div
        className='w-full lg:w-5/6  lg:h-3/6 xl:h-full relative bg-gray-200 rounded-2xl'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        }}
      >
        {/* Background */}
        <div className='w-full md:h-3/6 lg:h-4/6 rounded-t-2xl overflow-hidden border-3 border-solid border-blue-500'>
          <div className='w-full lg:h-full'>
            <img 
              src={!back_img ? assets.default_background_img : back_img} 
              className='w-full h-full '
              alt="Background"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className='absolute left-8 transform -translate-y-1/2'>
          <div className='w-20 h-20 md:w-28 md:h-28 lg:w-42 lg:h-42 rounded-full overflow-hidden border-4 border-white'>
            <img 
              src={!profile_img ? assets.default_profile_icon : profile_img} 
              className='w-full h-full object-cover'
              alt="Profile" 
            />
          </div>
        </div>

        {/* Info Section */}
        <div className='relative lg:top-10 pt-12 px-8 pb-6 flex justify-between'>

          <div>
              {/* Name */}
          <div className='font-semibold text-xl mb-1'>
            <p>{freelancer?.fullName || "Loading..."}</p>
          </div>
          
          {/* Email */}
          <div className='text-blue-500 flex items-center gap-1 mb-1'>
            <FontAwesomeIcon icon={faEnvelope} />
            <a href={`mailto:${freelancer?.email}`}>{freelancer?.email || "Loading..."}</a>
          </div>
          
          {/* Location */}
          <div className='flex items-center gap-1'>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{freelancer?.location || "Not specified"}</p>
          </div>

          </div>

          <div className='h-full bg-black border-2  border-solid border-black p-1 px-2 rounded-full hover:bg-white '>
            <FontAwesomeIcon
            icon={faPen}
            className='text-white hover:text-black'
            />
          </div>

        </div>

        {/* Edit Button */}
        <button className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100'>
          <FontAwesomeIcon icon={faPen} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default ProfilePage