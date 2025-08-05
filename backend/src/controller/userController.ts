import userModel from "../models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const signupUser = async (req: Request, res: Response) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        const alreadyExists = await userModel.findOne({ email });

        if (alreadyExists) {
            return res.status(409).json({
                message: "User with this email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

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
        const { email, password } = req.body;

        const userExists = await userModel.findOne({ email });

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

export { signupUser, signinUser };