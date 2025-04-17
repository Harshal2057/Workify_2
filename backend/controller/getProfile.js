import Freelancer from "../model/Freelancer.js"


const getFreelancerPofile = async(req ,res) => {
    try {
        
        const user = req.user;

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"NO user found"
            })
        }

        console.log(`The User => ${user}`);
        

        const freelancer = await Freelancer.findOne({UserId:user._id});

        if (!freelancer) {
            return res.status(400).json({
                success:false,
                message:"No freelancer found"
            })
        }

        console.log(`Freelancer => ${freelancer}`);
        

        return res.status(200).json({
            success:true,
            message:"Freelancer profile retrived successfully !!",
            profile:freelancer
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`Error ocurred while retriving freelancer profile =>${error}` 
        })
    }
}

export default getFreelancerPofile;