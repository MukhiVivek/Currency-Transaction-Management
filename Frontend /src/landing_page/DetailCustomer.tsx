import { useParams } from "react-router-dom";
import { useCustomerDetailData } from "../hooks/useCustomerDetailData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const currencySymbols: Record<"INR" | "USD" | "RUB", string> = {
  INR: "₹",
  USD: "$",
  RUB: "₽",
};

function DetailCustomer() {


  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(`${customerdata.name} - Transaction Report`, 14, 15);

    const tableColumn = ["Date", "Name", "Note", "Credit", "Debit", "Rate", "Currency", "Balance", "Status"];
    const tableRows: any[] = [];

    transactionsdata.slice().reverse().forEach((transaction) => {
      const isSender = transaction.sender_id.name === customerdata.name;

      const rowData = [
        new Date(transaction.date).toLocaleDateString("en-GB"),
        isSender ? transaction.receiver_id.name : transaction.sender_id.name,
        transaction.note,
        isSender ? "" : `${transaction.s_currency} ${transaction.s_amount}`,
        isSender ? `${transaction.s_currency} ${transaction.s_amount}` : "",
        transaction.rate,
        `${transaction.r_currency} => ${transaction.s_currency}`,
        isSender ? `${transaction.r_currency} ${transaction.r_balance}` : `${transaction.s_currency} ${transaction.s_balance}`,
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


  const id: string | undefined = useParams().id;

  const { transactionsdata, customerdata } = useCustomerDetailData(id);

  return (
    <>
      <div className="min-h-screen justify-between bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 dark:text-white p-4">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-3xl font-semibold tracking-wide">{customerdata.name}</h1>
        </div>
        <div className="border-2 border-black dark:border-white rounded-xl p-4 mt-10 w-full max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Phone Number : {customerdata.phone}</span>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>INR Balance : <span className={customerdata.INR >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{new Intl.NumberFormat('en-IN').format(Math.abs(customerdata.INR))}</span></span>
            <span>RUB Balance : <span className={customerdata.RUB >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{new Intl.NumberFormat('en-IN').format(Math.abs(customerdata.RUB))}</span></span>
            <span>USD Balance : <span className={customerdata.USD >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{new Intl.NumberFormat('en-IN').format(Math.abs(customerdata.USD))}</span></span>
          </div>
        </div>

        {/* Transaction */}
        <div className="flex justify-between text-sm mb-2">
          <h1 className="mt-2 mx-2">Transaction History :</h1>
          <h1 className="mt-2 mx-2 text-green-600 cursor-pointer" onClick={downloadPDF}>&darr; Dowload PDF</h1>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-md mt-2">
          <table className="w-full table-auto text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Other Details</th>
                <th scope="col" className="px-6 py-4">Creadit</th>
                <th scope="col" className="px-6 py-4">Debit</th>
                <th scope="col" className="px-6 py-4">Rate</th>
                <th scope="col" className="px-6 py-4">Currency</th>
                <th scope="col" className="px-6 py-4">Balance</th>
                <th scope="col" className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Replace the following dummy row with map data */}
              {transactionsdata.slice().reverse().map((transaction) =>
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                  <td className="px-6 py-3 whitespace-nowrap ">{new Date(transaction.date).toLocaleDateString('en-GB')}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{transaction.sender_id.name == customerdata.name ? transaction.receiver_id.name : transaction.sender_id.name}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{transaction.note}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{currencySymbols[transaction.s_currency] + " "} {new Intl.NumberFormat('en-IN').format(Math.abs(transaction.sender_id.name == customerdata.name ? 0 : transaction.s_amount))}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{currencySymbols[transaction.s_currency] + " "}{new Intl.NumberFormat('en-IN').format(Math.abs(transaction.sender_id.name == customerdata.name ? transaction.s_amount : 0))}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{transaction.rate}</td>
                  <td className="px-6 py-3 whitespace-nowrap ">{currencySymbols[transaction.r_currency]} =&gt; {currencySymbols[transaction.s_currency]}</td>
                  <td className={`px-6 py-3 whitespace-nowrap`}>{transaction.sender_id.name == customerdata.name ? currencySymbols[transaction.r_currency] +  (new Intl.NumberFormat('en-IN').format(Math.abs(transaction.s_balance))) : currencySymbols[transaction.s_currency] + " " + (new Intl.NumberFormat('en-IN').format(Math.abs(transaction.r_balance)))}</td>
                  <td className="px-6 py-3 whitespace-nowrap  text-green-500 font-semibold">{transaction.status}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}







export default DetailCustomer;