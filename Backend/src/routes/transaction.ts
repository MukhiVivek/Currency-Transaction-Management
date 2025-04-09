import express from "express";
import customer from "../models/customer";
import transaction from "../models/transaction";
import { checkuserlogin } from "../checkuser";
const router = express.Router({ mergeParams: true });

router.get("/data",checkuserlogin, async (req, res) => {
    try {
        //@ts-ignore
        const data = await transaction.find({creater_id: req.userId})

        res.json({
            data
        })
    } catch(e) {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
});

router.post("/add", checkuserlogin , async (req, res) => {

    const {
        date,
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
            status,
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
