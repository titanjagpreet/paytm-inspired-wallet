import express from "express";
import verifyJWT from "../middlewares/verifyJWT";
import { getBalance, getTransactions, transferMoney } from "../controller/accountController";

const accountRouter = express.Router();

accountRouter.get("/balance", verifyJWT, getBalance);

accountRouter.get("/transactions", verifyJWT, getTransactions);

accountRouter.post("/transfer", verifyJWT, transferMoney);

export default accountRouter;