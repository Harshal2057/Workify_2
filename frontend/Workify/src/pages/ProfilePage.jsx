import React from 'react'
import ProfilePageHeader from "../components/ProfilePageHeader.jsx"
import ProfileAbout from '../components/ProfileAbout.jsx'
import ProfileSkills from '../components/ProfileSkills.jsx'
import ProfileEducation from '../components/profileEducation.jsx'
import ProfileProjects from '../components/ProfileProjects.jsx'

const ProfilePage = () => {
  return (
    <div className='flex flex-col bg-gray-100 m-auto w-full'>
        <div>
            <ProfilePageHeader />
        </div>

        <div className='w-11/12 lg:w-5/6 m-auto mt-100 lg:mt-30 xl:mt-35 '>
            <ProfileAbout />
        </div>

        <div className='w-11/12 lg:w-5/6 m-auto mt-10 lg:mt-13 xl:mt-13 '>
            <ProfileSkills />
        </div>

        <div className='w-11/12 lg:w-5/6 m-auto mt-10 lg:mt-13 xl:mt-13 '>
            <ProfileEducation />
        </div>

        <div className='w-11/12 lg:w-5/6 m-auto mt-10 lg:mt-13 xl:mt-13 '>
            <ProfileProjects />
        </div>
    </div>
  )
}

export default ProfilePage