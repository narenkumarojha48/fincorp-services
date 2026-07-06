import express from 'express'
const router = express.Router()
import isAgentAuth from '../middlewares/isAgentAuth.js'
import {
  AgentRegisterController,
  AgentLoginController,
  AgentProfileController,
} from "../controllers/agent.controller.js";

router.route("/register").post(AgentRegisterController)
router.route("/login").post(AgentLoginController)
router.route("/me").get(isAgentAuth, AgentProfileController)

export default router
