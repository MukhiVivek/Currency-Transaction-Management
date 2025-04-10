import express from "express";
import customer from "../models/customer";
import transaction from "../models/transaction";
import { checkuserlogin } from "../checkuser";
import { idText } from "typescript";
const router = express.Router({ mergeParams: true });

router.get("/data",checkuserlogin, async (req, res) => {
    try {
        //@ts-ignore
        const data = await transaction.find({creater_id: req.userId}).populate("sender_id").populate("receiver_id");

        res.json({
            data
        })
    } catch(e : any) {
        res.status(401).json({
            message: e.message,
        })
    }
});

router.post("/add", checkuserlogin , async (req, res) => {

    const {
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
    }= req.body;

    try {

        const sender_id = await customer.findOne({name: sender_name});
        const receiver_id = await customer.findOne({name: receiver_name});        
        
        const newTransaction = await transaction.create({
            date,
            sender_id,
            s_amount,
            s_currency,
            receiver_id,
            r_amount,
            r_currency,
            rate,
            status : "success",
            note,
            //@ts-ignore
            creater_id: req.userId
        })

        res.status(201).json({
            message: "Transaction added successfully"
        })
        
    }catch(e) {
        res.status(403).json({
            message: "Customer not found"
        })
    }
    
});

export default router;
