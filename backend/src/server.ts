import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./models/db";
import userRouter  from "./routes/userRoutes";
import accountRouter from "./routes/accountRoutes";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/account", accountRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
})