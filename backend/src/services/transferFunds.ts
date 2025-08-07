import mongoose from "mongoose";
import { accountModel, txnModel } from "../models/models";

const transferFunds = async (fromAccountId: string, toAccountId: string, amount: number) => {

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const sender = await accountModel.findById(fromAccountId).session(session);
        const receiver = await accountModel.findById(toAccountId).session(session);

        if (!sender || !receiver) {
            throw new Error("One or both accounts not found");
        }

        const senderBalance = parseFloat(sender.balance.toString());

        if (senderBalance < amount) {
            throw new Error("Insufficient balance");
        }

        const [txn] = await txnModel.create(
            [
                {
                    from: fromAccountId,
                    to: toAccountId,
                    amount,
                    currency: 'INR',
                    status: 'pending'
                }
            ],
            { session }
        );

        sender.balance = mongoose.Types.Decimal128.fromString((senderBalance - amount).toFixed(2));

        const receiverBalance = parseFloat(receiver.balance.toString());
        receiver.balance = mongoose.Types.Decimal128.fromString((receiverBalance + amount).toFixed(2));

        await sender.save({ session });
        await receiver.save({ session });

        txn.status = 'success';
        await txn.save({ session });

        await session.commitTransaction();
        console.log("Transaction committed successfully");

    } catch (err) {
        await session.abortTransaction();
        console.error("Transaction aborted:", err);
        throw err;
    } finally {
        session.endSession();
    }
};

export default transferFunds;