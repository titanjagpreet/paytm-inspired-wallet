import express from "express";
import dotenv from "dotenv";
import connectDB from "./models/db";
import userRouter  from "./routes/userRoutes";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
})