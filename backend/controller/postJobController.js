import Job from "../model/Job.js";
import Clients from "../model/Clients.js";

const postJob = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.account !== "client") {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for client"
            })
        }

        const {title , description , type ,location , salaryType ,price , tags } = req.body;

        if (!title || !description || !type || !salaryType || !price || !tags) {
            return res.status(400).json({
                success:false,
                message:"Please fill the required fields"
            })
        }

        if (type === "remote" && !location) {
            return res.status(400).json({
                success:false,
                message:"Location is required for remote job"
            })
        }

       const client = await Clients.findOne({UserId : user.id} , {_id : 1})

       if (!client) {
        return res.status(400).json({
            success:false,
            message:"Client not found"
        })
       }

       const newJob = await Job.create({
        clientid:client._id,
        title,
        description,
        tags,
        type,
        location,
        salaryType,
        price
       })

       if (!newJob) {
            return res.status(400).json({
                success:false,
                message:"Error occured while creating newJob"
            })
       }

       const updateClient = await Clients.findByIdAndUpdate(
       client._id,
        {
            $push:{
                Pending_job:newJob._id
            }
        },
        {new:true}
       )

       if (!updateClient) {
            return res.status(400).json({
                success:false,
                message:"Error occured while updating Client"
            })
       }

       return res.status(200).json({
        success:true,
        message:"Job posted succesfully",
        newJob
       })



    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while posting job => ${error}`
        })
    }


}

const deleteJob = async(req , res) => {

    try {
        
        const user = req.user;

        if (user.account !== "client") {
            return res.status(400).json({
                success:false,
                message:"This is a protected route for client"
            })
        }

        const {jobid} = req.params;

        if (!jobid) {
            return res.status(400).json({
                success:false,
                message:"Job-Id is required"
            })
        }

        const job = await Job.findById(jobid);

        if (!job) {
            return res.status(400).json({
                success:false,
                message:"Job not found "
            })
        }

        const client = await Clients.findOne({UserId:user.id})

        if (!client || job.clientid.toString() !== client._id.toString()) {
            return res.status(400).json({
                success:false,
                message:"A client can delete only his own job"
            })
        }

        await Job.findByIdAndDelete(jobid);

       await Clients.findByIdAndUpdate(
        client._id,
        {
            $pull:{
                Pending_job:jobid
            }
        },
        {new:true}
       )

       return res.status(200).json({
        success:true,
        message:"Job Deleted successfully"
       })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while deleting a job => ${error}`
        })
    }

}

const getAllJobs = async(req ,res) => {

    try {
        
        const user = req.user;

        if (user.account !== "client") {
            return res.status(400).json({
                success:false,
                message:"Thsi is a protected route for client"
            })
        }

        const client  = await Clients.findOne({UserId:user.id} , {_id : 1});

        if (!client) {
            return res.status(400).json({
                success:false,
                message:"Client not found"
            })
        }

        const getAllJobs = await Job.find({clientid : client._id});

        if (getAllJobs.length === 0) {
            return res.status(400).json({
                success:false,
                message:"NO job found "
            })
        }

        return res.status(200).json({
            success:true,
            message:"Job retrived successfully",
            getAllJobs
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error occured while retriving job => ${error}`
    })
    }

}



export {postJob , deleteJob , getAllJobs};