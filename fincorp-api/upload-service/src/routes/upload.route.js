import express from 'express';
import multerUpload from '../utils/multer.configs.js';
import { panController } from '../controllers/pancard.controller.js';
import { rcController } from '../controllers/rc.controller.js';
import { adharController } from '../controllers/adhar.controller.js';
const router = express.Router();
router.route("/pan").post(multerUpload.single("pancard"),panController)
router.route("/adhar").post(adharController)
router.route("/rc").post(rcController)

export default router