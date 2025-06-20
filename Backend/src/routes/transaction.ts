import express from "express";
import customer from "../models/customer";
import transaction from "../models/transaction";
import { checkuserlogin } from "../checkuser";
import mongoose from "mongoose";

const router = express.Router({ mergeParams: true });

// transaction data fetch

router.get("/data", checkuserlogin, async (req, res) => {
    try {
        //@ts-ignore
        const data = await transaction.find({ creater_id: req.userId }).populate("sender_id").populate("receiver_id");

        res.json({
            data
        })
    } catch (e: any) {
        res.status(401).json({
            message: e.message,
        })
    }
});

// transaction add

router.post("/add", checkuserlogin, async (req: any, res: any) => {

    let {
        date = new Date(),
        sender_name,
        s_amount,
        s_currency,
        receiver_name,
        r_amount,
        r_currency,
        rate,
        status,
        note,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    interface Customer {
        name?: string;
        phone?: number;
        INR: number;
        RUB: number;
        USD: number;
        creater_id?: string;
    }

    try {

        const sender_id = await customer.findOne({ name: sender_name , creater_id: req.userId }).session(session);
        const receiver_id = await customer.findOne({ name: receiver_name , creater_id: req.userId }).session(session);

        (sender_id as any)[s_currency] -= s_amount;
        (receiver_id as any)[r_currency] += r_amount;

        await (sender_id as any).save({ session });
        await (receiver_id as any).save({ session });

        const [newTransaction] = await transaction.create([{
            date,
            sender_id: sender_id?._id,
            s_amount,
            s_currency,
            receiver_id: receiver_id?._id,
            r_amount,
            r_currency,
            rate,
            status: "success",
            note,
            r_balance: (receiver_id as any)[r_currency],
            s_balance: (sender_id as any)[s_currency],
            //@ts-ignore
            creater_id: req.userId
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Transaction added successfully"
        })

    } catch (e) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/detail/:id", checkuserlogin, async (req, res) => {
    try {
        const { id } = req.params;

        const data = await transaction.find({
            $or: [
                { sender_id: id },
                { receiver_id: id }
            ],
            //@ts-ignore
            creater_id: req.userId, // Optional: filters by who created the transaction
        }).populate("sender_id").populate("receiver_id");

        res.json({
            data
        })
    } catch (e) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
})

// transaction edit

router.post("/edit/:id", checkuserlogin , async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const {
            sender_name,
            s_amount,
            s_currency,
            receiver_name,
            r_amount,
            r_currency,
            rate,
            status,
            note,
        } = req.body;

        const session = await mongoose.startSession();
        
        session.startTransaction();

        try {

            const sender_id = await customer.findOne({ name: sender_name, creater_id: req.userId }).session(session);
            const receiver_id = await customer.findOne({ name: receiver_name, creater_id: req.userId }).session(session);

            const oldTransaction : any = await transaction.findOne({ _id: id }).session(session);
            
            (sender_id as any)[oldTransaction.s_currency] += oldTransaction.s_amount;
            (receiver_id as any)[oldTransaction.r_currency] -= oldTransaction.r_amount;

            await (sender_id as any).save({ session });
            await (receiver_id as any).save({ session });

            (sender_id as any)[s_currency] -= s_amount;
            (receiver_id as any)[r_currency] += r_amount;

            await (sender_id as any).save({ session });
            await (receiver_id as any).save({ session });

            await transaction.findOneAndUpdate({
                _id: id
            }, {
                sender_id: sender_id?._id,
                s_amount,
                s_currency,
                receiver_id: receiver_id?._id,
                r_amount,
                r_currency,
                rate,
                status: "success",
                note,
                r_balance: (receiver_id as any)[r_currency],
                s_balance: (sender_id as any)[s_currency],
                //@ts-ignore
                creater_id: req.userId,
                edit_date: new Date(),
            }, { session });


            await session.commitTransaction();
            session.endSession();

            res.status(201).json({
                message: "Transaction updated successfully"
            })

        } catch (e) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ message: "Something went wrong" });
        }
    } catch (e) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
})

router.delete("/:id", checkuserlogin, async (req : any, res : any) => {
    try {
        const { id } = req.params;

        const session = await mongoose.startSession();
        session.startTransaction();

        const transactionData : any = await transaction.findOne({ _id: id }).session(session);

        if (!transactionData) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        const sender_id = await customer.findById(transactionData.sender_id).session(session);
        const receiver_id = await customer.findById(transactionData.receiver_id).session(session);

        (sender_id as any)[transactionData.s_currency] += transactionData.s_amount;
        (receiver_id as any)[transactionData.r_currency] -= transactionData.r_amount;

        await (sender_id as any).save({ session });
        await (receiver_id as any).save({ session });

        await transaction.deleteOne({ _id: id }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Transaction deleted successfully"
        })
    } catch (e) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

router.get("/:id", checkuserlogin, async (req : any, res) => {
    try {
        const { id } = req.params;

        const data = await transaction.findById(id).populate("sender_id").populate("receiver_id");
        
        res.json({
            data
        })
    }catch(e) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }  
});


export default router;
