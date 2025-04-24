import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useCustomerDetailData } from "../hooks/useCustomerDetailData";
import { useParams } from "react-router-dom";

const DowloadPDF = () => {

    const id: string | undefined = useParams().id;

    const { transactionsdata , customerdata } = useCustomerDetailData(id);

    const doc = new jsPDF();

    doc.text(`${customerdata.name} - Transaction Report`, 14, 15);

    const tableColumn = ["Date", "Name", "Note", "Credit", "Debit", "Rate", "Currency", "Status"];
    const tableRows: any[] = [];

    const currencySymbols: Record<"INR" | "USD" | "RUB", string> = {
        INR: "₹",
        USD: "$",
        RUB: "₽",
    };

    transactionsdata.slice().reverse().forEach((transaction) => {
        const isSender = transaction.sender_id.name === customerdata.name;

        const rowData = [
            new Date(transaction.date).toLocaleDateString("en-GB"),
            isSender ? transaction.receiver_id.name : transaction.sender_id.name,
            transaction.note,
            isSender ? "" : `${currencySymbols[transaction.s_currency]} ${transaction.s_amount}`,
            isSender ? `${currencySymbols[transaction.s_currency]} ${transaction.s_amount}` : "",
            transaction.rate,
            `${currencySymbols[transaction.r_currency]} => ${currencySymbols[transaction.s_currency]}`,
            transaction.status,
        ];
        tableRows.push(rowData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: {
            fontSize: 8,
        },
    });

    doc.save(`${customerdata.name}_Transactions.pdf`);
};


export default DowloadPDF;