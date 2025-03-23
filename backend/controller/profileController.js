import Client from "../model/Clients.js";
import Freelancer from "../model/Freelancer.js";
import Project from "../model/Project.js";

const clientProfile = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.account !== "client") {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Client"
            })
        }

        const {contact , location , DateOfBirth} = req.body;
       

        if (!contact || !location) {
            return res.status(400).json({
                success:false,
                message:"Please fill required fields"
            })
        }


        const newProfile = await Client.create({
            UserId:user._id,
            fullName:user.name,
            contact,
            location,
            DateOfBirth,
            email:user.email,
        })

        if (!newProfile) {
            return res.status(400).json({
                success:false,
                message:"Error occured while creating Client profile"
            })
        }

        console.log("Client profile created !!");

        return res.status(200).json({
            success:true,
            message:"Client Profile created successfully",
           profile: newProfile
        })
        

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while creating Client profile =>  ${error}`
        })
    }

}

const freelanceProfileInfo = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.account !== "freelancer") {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for freelancer"
            })
        }

       console.log(`The user id => ${user._id}`)
        

        const {contact , location , github  } = req.body;
        
        if (!contact || !location ) {
            return res.status(400).json({
                success:false,
                message:"Please fill the required fields"
            })
        }

        const updateFreelancerProfile = await Freelancer.findOneAndUpdate(
            { UserId:user.id } ,
         {
            $set:{
                contact: contact,
                location: location,
                github: github ?? ""
            }
         },
         {new:true}
        )

        console.log(`The updated freeelancer => ${updateFreelancerProfile}`);
        

        if (!updateFreelancerProfile) {
            return res.status(400).json({
                success:false,
                message:"Error occured while creating Freelancer profile here"
            })
        }

        console.log("Freelancer profile updated successfully");

        return res.status(200).json({
            success:true,
            message:"Freelancer profile updated successfully",
            profile: updateFreelancerProfile
        })
        


    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:`Error occured while updating freelancer profile => ${error}`
        })

    }

}

const freelanceProfileSkills = async(req ,res) => {

    try {
        
        const {skills , about , education } = req.body;
        const user = req.user;

        const updateFreelancerProfile = await Freelancer.findByIdAndUpdate(
            user._id ,
           {
              $set:{
                skills: Array.isArray(skills) ? skills : [],
                about: about || "",
                education: Array.isArray(education) ? education : []
              }
           },
           {new:true}
          )

          if (!updateFreelancerProfile) {
            return res.status(400).json({
                success:false,
                message:"Error occured while updating freelancer pofile"
            })
          }

          return res.status(200).json({
            success:true,
            message:"Freelancer profile updated successfully"
          })


    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while Updating Freelancer skill section => ${error}`
        })
    }

}

const freelancerProject = async(req ,res) => {

    try {
        
        const {proj_name , proj_url ,proj_desc } = req.body;
        const user = req.user;

        if (!proj_name || !proj_url || !proj_desc) {
            return res.status(400).json({
                success:false,
                message:"Please fill the required filled"
            })
        }

        const newProject = await Project.create({
            userId:user._id,
            proj_name:proj_name,
            proj_url:proj_url,
            proj_desc:proj_desc
        })

        if (!newProject) {
            return res.status(400).json({
                success: false,
                message: "Error occurred while creating Project"
            });
        }

        console.log("Project created successfully");

        const updateProject = await Freelancer.findByIdAndUpdate(
            user._id,
            {
                $push:{
                    projects:newProject._id
                }
            },
            {new:true}
        )
        
        if (!updateProject) {
            return res.status(400).json({
                success:false,
                message:"Freelancer not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Project uploaded successfully",
            newProject,
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while uploading Project => ${error}`
        })
    }

}


export  {clientProfile , freelanceProfileInfo , freelanceProfileSkills , freelancerProject};