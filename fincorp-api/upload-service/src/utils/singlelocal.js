import multer from "multer"
import path from 'path'
import { fileTypeFromStream,fileTypeFromFile,fileTypeFromBuffer } from "file-type"

const storage = multer.diskStorage({
    destination(req,file,cb){
      console.log(req.file)
    // /upload/:userId, you can access req.params.userId inside the destination function to create user-specific folders.
    // file.fieldname: The name used in the form (e.g., "pan_card").
    // file.originalname: The name of the file on the user's computer.
    // file.mimetype: The type of file (e.g., image/jpeg).
    // cb: The callback function (error, path)
    // const uploadDir = path.join('uploads', 'user_123', 'kyc');
   // Output on Windows: 'uploads\user_123\kyc'
      // Output on Linux: 'uploads/user_123/kyc'
    // path.parse('/home/user/electric_bill.pdf');
    /* Returns:
     {
       root: '/',
       dir: '/home/user',
       base: 'electric_bill.pdf',
       ext: '.pdf',
       name: 'electric_bill'
       }
    */
    cb(null, "uploaddocs")
    },
    filename(req,file,cb){
      
    }
})
const singleupload = multer({storage:storage})
export default multerUpload