import Job from "../model/Job.js";

const getAllJobs = async(req , res) => {

    try {
        
        const getAllJobs = await Job.find();

        if (getAllJobs.length === 0) {
            return res.status(404).json({
                success:false,
                message:"NO job found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Job displayed successfully",
            getAllJobs
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error while retriving job on homescreen => ${error}`
        })
    }

}

const tagJobs = async(req , res) => {

    try {
        
        const {tags} = req.body;

        const findJob = await Job.find({tags : {$in : tags}});

        if (findJob.length === 0 ) {
            return res.status(400).json({
                success:false,
                message:"NO job found using the tag provided"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Jobs retrieved successfully",
            findJob,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error while retrieving jobs => ${error}`,
        });
    }

}

export {getAllJobs , tagJobs};