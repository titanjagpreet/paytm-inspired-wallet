import mongoose from "mongoose";

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
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        unique: true
    },
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        get: (v: mongoose.Types.Decimal128) => parseFloat(v.toString()),
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'ETH', 'BTC'],
        default: 'INR',
    },
    accountType: {
        type: String,
        enum: ['wallet', 'savings', 'trading'],
        default: 'wallet'
    },
    isFrozen: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

const transactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0.01,
        get: (v: mongoose.Types.Decimal128) => parseFloat(v.toString()),
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'ETH', 'BTC'],
        default: 'INR',
    },
    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "pending"
    },
    note: {
        type: String,
        default: "",
        maxlength: 100,
    },
},
    {
        timestamps: true
    }
);

const userModel = mongoose.model('User', userSchema);
const accountModel = mongoose.model('Account', accountSchema);
const txnModel = mongoose.model('Transaction', transactionSchema);

export { userModel, accountModel, txnModel };