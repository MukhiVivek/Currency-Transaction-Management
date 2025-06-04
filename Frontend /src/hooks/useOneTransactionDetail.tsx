import axios from "axios";
import {  useEffect, useState } from "react";
import { BACKEND_URL } from "../Config";

export interface Transaction {
    id: number;
    date: string;
    status: '"success"' | 'Pending';
    r_currency: 'INR' | 'USD' | 'RUB';
    r_amount: number;
    s_currency: 'INR' | 'USD' | 'RUB';
    s_amount: number;
    customer_id: string;
    sender_id: string;
    creator_id: string;
}


function useOneTransactionDetail(id: string | undefined) {
    const [data , setData] = useState<Transaction[]>([]);

    function getdata() {
        axios.get(`${BACKEND_URL}/api/v1/transaction/${id}`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            setData(res.data.data);
        })
    }

    useEffect(() => {
        getdata()
    }, []);
    
    return (data);
}

export default useOneTransactionDetail;