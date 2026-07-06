import express from 'express'
const router = express.Router()
import isAuth from '../middlewares/isauth.js'
import {
  LoginController,
  AddRoleController,
  LogoutController,
  RegisterController,
  TokenController,
  RefreshTokenController,
  MyProfile
} from "../controllers/auth.controller.js";


router.route("/register").post(RegisterController)
router.route("/login").post(LoginController)
router.route("/logout").post(LogoutController)
router.route("/token").post(isAuth,TokenController)
router.route("/refreshtoken").post(RefreshTokenController)
router.route("/addrole").put(isAuth,AddRoleController)
router.route("/me").put(isAuth,MyProfile)

export default router