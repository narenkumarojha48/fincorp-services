export const adharController = async(req,res,next)=>{
    try {
        res.status(200).json({message:"This is adharController"})
    } catch (error) {
        next(error)
    }
}