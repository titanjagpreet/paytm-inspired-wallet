import { userModel, accountModel, txnModel } from "../models/models";
import { Request, Response } from "express";
import transferFunds from "../services/transferFunds";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
    userid?: string;
}

const getBalance = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.userid;

        const account = await accountModel.findOne({ userId: userid });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        const balance = account?.balance;

        return res.status(200).json({
            message: "Balance fetch successfull",
            balance: balance
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userid;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        const account = await accountModel.findOne({ userId });

        if (!account) {
            return res.status(404).json({ message: "User account not found" });
        }

        const accountId = account._id;

        const transactions = await txnModel.find({
            $or: [
                { from: accountId },
                { to: accountId }
            ]
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "from",
                populate: {
                    path: "userId",
                    select: "username name"
                }
            })
            .populate({
                path: "to",
                populate: {
                    path: "userId",
                    select: "username name"
                }
            });

        const formattedTxns = transactions.map((txn) => {
            const isSent = txn.from._id.toString() === accountId.toString();

            const counterpartyAccount = isSent ? txn.to : txn.from;
            const counterpartyUser = (counterpartyAccount as any)?.userId;

            return {
                type: isSent ? 'sent' : 'received',
                user: counterpartyUser?.username ?? 'unknown_user',
                name: counterpartyUser?.name ?? 'Unknown',
                amount: parseFloat(txn.amount.toString()),
                currency: txn.currency,
                date: txn.createdAt,
                status: txn.status,
                note: txn.note
            };
        });

        return res.status(200).json({
            message: "Transactions fetched successfully",
            transactions: formattedTxns,
        });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        if (err instanceof Error) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(500).json({ message: "An unknown error occurred" });
    }
};

const transferMoney = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userid = req.userid;
        const { receiverUsername, amount } = req.body;

        if (!userid) {
            return res.status(401).json({ message: "Unauthorized: User ID missing" });
        }

        if (!receiverUsername || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: "Invalid receiver username or amount" });
        }

        const senderAccount = await accountModel.findOne({ userId: userid });
        if (!senderAccount) {
            return res.status(404).json({ message: "Sender account not found" });
        }

        const fromAccountId = senderAccount._id.toString();

        const receiver = await userModel.findOne({ username: receiverUsername });
        if (!receiver) {
            return res.status(404).json({ message: "Receiver user not found" });
        }

        const receiverAccount = await accountModel.findOne({ userId: receiver._id });
        if (!receiverAccount) {
            return res.status(404).json({ message: "Receiver account not found" });
        }

        const toAccountId = receiverAccount._id.toString();

        await transferFunds(fromAccountId, toAccountId, amount);

        return res.status(200).json({
            message: "Funds successfully transferred",
        });

    } catch (err) {
        console.error("Transfer error:", err);
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export { getBalance, getTransactions, transferMoney }