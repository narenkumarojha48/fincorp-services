import express from "express";
const router = express.Router();
import { submitContact } from "../controllers/contact.controller.js";

router.post("/submit", submitContact);

export default router;
