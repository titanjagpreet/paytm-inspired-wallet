import { userModel, accountModel } from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
    userid?: string;
}

const signupUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const emailExists = await userModel.findOne({ email });
        const usernameExists = await userModel.findOne({ username });

        if (emailExists || usernameExists) {
            return res.status(409).json({
                message: emailExists
                    ? "User with this email already exists"
                    : "User with this username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword
        });

        const randomBalance = Math.floor(Math.random() * 1000) + 1;
        // between 1 to 1000

        const initialBalance = await accountModel.create({
            userId: user._id,
            balance: randomBalance
        });

        if (user) {
            return res.status(201).json({
                message: `User signed up! Welcome ${firstName}`
            });
        } else {
            return res.status(500).json({ message: "User creation failed" });
        }

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const signinUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userExists = await userModel.findOne({ username });

        if (!userExists) {
            return res.status(404).json({
                message: "User does not exists"
            });
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const JWT_SECRET = process.env.JWT_SECRET;

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in your environment variables.");
        }

        const jwtToken = jwt.sign({ userid: userExists._id }, JWT_SECRET);

        return res.status(200).json({
            token: jwtToken,
            message: `User logged in. Welcome ${userExists.firstName}`
        });

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.userid;
        const user = await userModel.findById(userid).select("firstName lastName username email");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const updateEmail = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { email } = req.body;
        const userid = req.userid;
        const user = await userModel.findById(userid);

        if (email == user?.email) {
            return res.status(400).json({
                message: "Please enter new email id"
            })
        }

        const emailInUse = await userModel.findOne({ email });

        if (emailInUse) {
            return res.status(400).json({
                message: "This email is already in use by someone else"
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(userid, { email: email }, { new: true });

        return res.status(200).json({
            message: "Email updated successfully",
            userEmail: updatedUser?.email
        });

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const updateUsername = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { username } = req.body;
        const userid = req.userid;
        const user = await userModel.findById(userid);

        if (username == user?.username) {
            return res.status(400).json({
                message: "Please enter new username"
            })
        }

        const usernameInUse = await userModel.findOne({ username });

        if (usernameInUse) {
            return res.status(400).json({
                message: "This username is already used by someone else"
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(userid, { username: username }, { new: true });

        return res.status(200).json({
            message: "Username updated successfully",
            username: updatedUser?.username
        });

    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export { signupUser, signinUser, getProfile, updateEmail, updateUsername };