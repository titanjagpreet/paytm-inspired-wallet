import express from "express";
import { validateSignup, validateSignin } from "../middlewares/userValidation";
import { signupUser, signinUser } from "../controller/userController";
const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);

userRouter.post("/signin", validateSignin, signinUser);

export default userRouter;