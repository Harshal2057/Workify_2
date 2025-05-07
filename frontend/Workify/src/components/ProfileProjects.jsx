import React, { useContext, useState , useEffect} from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const ProfileProjects = () => {

  const { url ,projects , setProjects , freelancer , fetchFreelancerProjects} = useContext(StoreContext);



  const[show , setShow] = useState(false);
  const[addShow , setAddShow] = useState(false)
  const[currProject , setCurrProject] = useState({
    projectName : "",
    projectUrl : "",
    projectDesc : ""
  })
  const[formData , setFormData] = useState({
    projName: "",
    projDesc:"",
    projUrl:""
  })

  useEffect(() => {
    if (projects) {
      setProjects(projects);
    }
  }, []);

  const handleProject = (projName , projDesc , projUrl) => {
      setCurrProject({
        projectName : projName,
        projectUrl : projUrl,
        projectDesc : projDesc
      })

      setShow(true);
  }

  const handleProjectDetailsChange = (e) => {
    
      const {name , value} = e.target;

     setFormData((prev) => {
        const updateData = {
          ...prev,
          [name]:value
        }
        console.log(updateData);
        return updateData;
     })

  }

const hanfleProjectDetails = async(e) => {

    e.preventDefault();

  try {
    const Response = await axios.post(`${url}/api/profile/freelancer/project` , 
      {
        proj_name: formData.projName,
        proj_desc: formData.projDesc,
        proj_url: formData.projUrl,
      }
      , {
      withCredentials:true
    })

    if (Response.data.success) {
      toast.success("Project submitted successfully !!")
      setAddShow(false);
      await fetchFreelancerProjects();
    }

    console.log(Response.data);
    

  } catch (error) {
    console.log(`Problem occured while posting project => ${error}`);
    toast.error("Error occured while posting project !!!")
  }

}




  return (
    <div>
      {show 
      // Particular Project Display
      ? <div 
        className='bg-white w-full rounded-2xl p-8 border-1 border-solid flex flex-col gap-3'
        style={{
        outline: "3px dashed grey",
        outlineOffset: "-15px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}>
         <div>
          <p className='font-semibold text-2xl'>{currProject.projectName}</p>
         </div>

        <div>
          <p className='text-gray-500 text-lg'>{currProject.projectDesc}</p>
        </div>

        <div className='flex'>
          <p className='font-semibold'>Github-Link :-</p>
          <a href={currProject.projectUrl} target='_blank' rel="noopener noreferrer" >
               <p className='text-gray-500 text-lg'>{currProject.projectUrl}</p>
          </a>
        </div>
        
        <button
        onClick={() => setShow(false)}
        className='border-3 border-solid p-1 px-2 rounded-2xl hover:bg-black hover:text-white w-max'>
          <p className=''>Back</p>
        </button>

        </div>

        // Main Container
      : addShow
      ?
      //Add Project Display
      <div
      className='bg-gray-100 w-full rounded-2xl p-6 border-1 border-solid flex flex-col gap-3'
      >
        {/* Heading */}
        <div className='flex items-center justify-between text-3xl'>
          <p className='font-semibold text-2xl'>Add Projects</p>
          <FontAwesomeIcon icon={faXmark} onClick={() => setAddShow(false)} />
        </div>

        {/* Main Container */}
          

              <form
              onSubmit={hanfleProjectDetails}
              className='w-full flex flex-col gap-4 border-3 border-dashed p-2 rounded-2xl'>

                <div className='w-full flex flex-col gap-1'>
                    <label id='proj_name'>
                      <p>Project Name </p>
                    </label>
                    <input type="text" name="projName" value={formData.projName} onChange={handleProjectDetailsChange} id="proj_name" placeholder='Add your Projects' className='w-full border-2 border-solid p-1 rounded-lg'/>
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label id='proj_desc'>
                      <p>Project Description </p>
                    </label>
                    <input type="text" name="projDesc" value={formData.projDesc} onChange={handleProjectDetailsChange} id="proj_desc" placeholder='Add your Projects Description' className='w-full border-2 border-solid p-1 rounded-lg'/>
                </div>

                <div className='w-full flex flex-col gap-1'>
                    <label id='proj_url'>
                      <p>Project link </p>
                    </label>
                    <input type="text" name="projUrl" value={formData.projUrl} onChange={handleProjectDetailsChange} id="proj_url" placeholder='Add your Projects Github-Link' className='w-full border-2 border-solid p-1 rounded-lg'/>
                </div>

                <button type='submit' className='border-3 border-solid w-max p-1 px-2 rounded-2xl hover:bg-black hover:text-white'>
                  Add
                </button>

              </form>


      </div>
   
      : <div 
      className='bg-white w-full rounded-2xl p-8'
      style={{
        outline: "3px dashed grey",
        outlineOffset: "-15px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
      >
        <div>
          <p className="font-semibold text-2xl">Projects</p>
        </div>

        
 <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
  {projects.map((project, index) => (
    <li key={index} className="flex gap-2 items-center">
      <p 
       className="font-normal text-lg border-2 border-solid rounded-3xl bg-black text-white py-2 px-2 cursor-pointer"
       onClick={() => handleProject(project.proj_name ,project.proj_desc , project.proj_url )}
       >{project.proj_name}</p>
      <p className="text-lg text-gray-500">{project.proj_desc}</p>
    </li>
  ))}
</ul>

      <button
        onClick={() => setAddShow(true)}
        className='border-3 border-solid p-1 px-2 rounded-2xl hover:bg-black hover:text-white w-max mt-3'>
          <p className=''>Add</p>
        </button>

      </div>
      }
     
     
    </div>
  )
}

export default ProfileProjects