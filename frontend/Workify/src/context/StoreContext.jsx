import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"

    const navigate = useNavigate();

    const[token , setToken] = useState("");
    const[showLogin , setShowLogin] = useState("");
    const [freelancer, setFreelancer] = useState(null)
    const [back_img, setBack_img] = useState(null)
    const [profile_img, setProfile_img] = useState(null)
  const [projects , setProjects] = useState([]);
    
     

   
    //Check-Auth
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken); // Set token in context/state
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")

    }

     //Setting Background and Profile 
    const fetchFreelancer = async() => {
      const token = localStorage.getItem("token")

      if (!token) {
        console.log("No token found, redirecting to login")
        navigate("/auth");
        return
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

    //Fetching Freelancer Projects
    const fetchFreelancerProjects = async() => {

      const token = localStorage.getItem("token");

       if (!token) {
        console.log("No token found, redirecting to login")
        navigate("/auth");
        return
      }

   try {
    console.log("Fetching projects.....");
    
    const Response = await axios.get(`${url}/api/get-projects/allProjects` , {
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });

    if (Response.data.projects && Response.data.projects.length > 0) {
      console.log("The length is greater than 0");
      setProjects(Response.data.projects);
      console.log(Response.data.projects);
    }

 
   

   } catch (error) {
      console.log(`Error occured while fetching freelancer projects =>${error}`)
   }

    }

    // useEffect(() => {
    //   if (projects.length > 0) {
    //     console.log("in useeffect =>");
    //     console.log(typeof(projects));
        
    //     console.log(projects);
        
    //   }
    // } , [projects])
   
    useEffect(() => {
        fetchFreelancer(),
        fetchFreelancerProjects()
      } , [])


   
      
  
    const contextValue = {
            url,
            token,
            setToken,
            showLogin,
            setShowLogin,
            logOut,
            freelancer,
            fetchFreelancer,
            projects,
            setProjects,
            fetchFreelancerProjects
    }

    return <StoreContext.Provider value={contextValue}>
            {props.children}
    </StoreContext.Provider>

}

export default StoreContextProvider;