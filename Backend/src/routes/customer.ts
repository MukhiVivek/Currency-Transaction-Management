import express from "express";
import customer from "../models/customer";
import { checkuserlogin } from "../checkuser";
const router = express.Router({ mergeParams: true });

router.get("/data" ,checkuserlogin ,  async (req, res) => {
    try {
        //@ts-ignore
        const data = await customer.find({ creater_id: req.userId })

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
        name,
        phone,
        inr,
        usdt,
        rub
    } = req.body;

    try {
        const newCustomer = await customer.create({
            name,
            phone,
            INR : inr,
            RUB : rub,
            USD : usdt,
            //@ts-ignore
            creater_id: req.userId
        })

        res.status(201).json({
            message: `Customer added successfully + ${newCustomer}`
        })
        
    }catch(e) {
        res.status(403).json({
            message: "Customer not found"
        })
    }
    
});

export default router;
