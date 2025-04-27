import React from 'react'
import ProfilePageHeader from "../components/ProfilePageHeader.jsx"
import ProfileAbout from '../components/ProfileAbout.jsx'

const ProfilePage = () => {
  return (
    <div className='flex flex-col bg-gray-100 m-auto w-full'>
        <div>
            <ProfilePageHeader />
        </div>

        <div className='w-11/12 lg:w-5/6 m-auto mt-100 lg:mt-25 xl:mt-35 '>
            <ProfileAbout />
        </div>
    </div>
  )
}

export default ProfilePage