export const panController = async(req,res,next)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    try {
        console.log(req.file)
        

    if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ 
            error: "Invalid file type. Only JPG, PNG, and PDF are allowed." 
        });
    }

    // Proceed to Google Drive upload...
        res.status(200).json({
            message: "This is panController",
            path: file?.path
        })

    } catch (error) {
        next(error)
    }
}