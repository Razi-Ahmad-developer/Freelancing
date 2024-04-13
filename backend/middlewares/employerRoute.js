const employerAuthenticate = async(req,res,next) => {
    try {
        const userRole = req.user.role;
        if(!userRole=="employer"){
            return res.status(401).json({message:"You are not an Employer!"});
        }

        next();
    } catch (error) {
        return res.status(401).json({message:"You are not an Employer!"});
    }
}
module.exports = employerAuthenticate