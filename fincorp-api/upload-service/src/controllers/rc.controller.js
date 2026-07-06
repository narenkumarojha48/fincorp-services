export const rcController = async(req,res,next)=>{
    try {
        res.status(200).json({message:"This is rcController"})
    } catch (error) {
        next(error)
    }
}