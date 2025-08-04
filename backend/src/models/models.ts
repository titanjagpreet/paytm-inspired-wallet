import mongoose from "mongoose";
import { lowercase, trim } from "zod";
import { required } from "zod/mini/index.cjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true
    }
);