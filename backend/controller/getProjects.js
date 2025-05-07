import Freelancer from "../model/Freelancer.js";
import Project from "../model/Project.js"

const getProjects = async(req ,res) => {

    try {
        
        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"No user found !!"
            })
        }

        const freelancer = await Freelancer.findOne({UserId : user.id}).populate("projects");

        
        if (!freelancer) {
            return res.status(400).json({
                success:false,
                message:"No freelancer found !!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            projects: freelancer.projects,  // Now this includes full details like proj_name, proj_desc, etc.
          });
         

    } catch (error) {
        
        console.error("Error in getProjects:", error);
        return res.status(500).json({
          success: false,
          message: "Server error",
        });
      
    }

}

export default getProjects;