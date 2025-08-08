import express from "express";
import { validateSignup, validateSignin, validateEmail, validateUsername } from "../middlewares/userValidation";
import { signupUser, signinUser, getProfile, updateEmail, updateUsername } from "../controller/userController";
import verifyJWT from "../middlewares/verifyJWT";
const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);

userRouter.post("/signin", validateSignin, signinUser);

userRouter.get("/profile", verifyJWT, getProfile);

userRouter.put("/email", verifyJWT, validateEmail, updateEmail);

userRouter.put("/username", verifyJWT, validateUsername, updateUsername);

export default userRouter;