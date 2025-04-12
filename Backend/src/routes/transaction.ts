import express from "express";
import customer from "../models/customer";
import transaction from "../models/transaction";
import { checkuserlogin } from "../checkuser";
import mongoose from "mongoose";

const router = express.Router({ mergeParams: true });

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

        const sender_id = await customer.findOne({ name: sender_name }).session(session);
        const receiver_id = await customer.findOne({ name: receiver_name }).session(session);

        (sender_id as any)[s_currency] -= s_amount;
        (receiver_id as any)[r_currency] += r_amount;

        await (sender_id as any).save({ session });
        await (receiver_id as any).save({ session });

        const newTransaction = await transaction.create({
            date,
            sender_id,
            s_amount,
            s_currency,
            receiver_id,
            r_amount,
            r_currency,
            rate,
            status: "success",
            note,
            //@ts-ignore
            creater_id: req.userId
        }, {session});

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

export default router;
