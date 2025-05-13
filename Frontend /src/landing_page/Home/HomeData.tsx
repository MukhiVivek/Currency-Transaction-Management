import { useEffect, useState } from "react";
import useTransaction, { Transaction } from "../../hooks/useTransaction";
import { useUser } from "../../hooks/useUser";

interface SummaryProps {
    totalReceived: number;
    totalSent: number;
    transactionCount: number;
}

function UseHomeData(Day: number) {

    const transactionData = useTransaction();

    const [filteredData, setFilteredData] = useState<Transaction[]>([]);

    useEffect(() => {
        const now = new Date();

        const newData = transactionData.filter((tx) => {
            if (Day === 0) return true; // Show all

            const txDate = new Date(tx.date);
            const diffTime = now.getTime() - txDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);

            return diffDays <= Day;
        });
        setFilteredData(newData);
    }, [Day, transactionData]);

    return(filteredData);

}

export default UseHomeData;