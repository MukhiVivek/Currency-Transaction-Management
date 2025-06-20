import { Link } from "react-router-dom";
import Deleteicon from "../icons/Deleteicon";
import EditIcon from "../icons/editicon";
import { BACKEND_URL } from "../Config";
import axios from "axios";

interface data {
  id: string;
  date: string;
  sender_name: string;
  s_amount: number;
  s_currency: string;
  receiver_name: string;
  r_amount: number;
  r_currency: string;
  rate: number;
  status: string;
}


function TransactionCard({ date, sender_name, s_amount, s_currency, receiver_name, r_amount, r_currency, rate, status , id }: data) {

  if (s_currency === "INR") {
    s_currency = "₹";
  } if (s_currency === "RUB") {
    s_currency = "₽";
  } if (s_currency === "USD") {
    s_currency = "$";
  };

  if (r_currency === "INR") {
    r_currency = "₹";
  } if (r_currency === "RUB") {
    r_currency = "₽";
  } if (r_currency === "USD") {
    r_currency = "$";
  };

  function deleteTransaction(){
    axios.delete(BACKEND_URL + "/api/v1/transaction/" + id, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(() => {
      alert("Transaction Deleted Successfully");
      window.location.reload();
    })
    .catch(() => {
      alert("Something went wrong");
    });
  }

  return (
    <div className=" bg-white dark:bg-black border dark:border-gray-700 rounded-2xl shadow-lg p-3  mb-4 w-full max-w-2xl mx-auto transition-colors duration-300">
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <span>{new Date(date).toLocaleDateString('en-GB')}</span>
        <span className="text-green-500 dark:text-green-400 font-semibold">{status}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left">
          <span className="font-semibold text-lg text-black dark:text-white">{sender_name}</span>
          <span className="text-gray-500 dark:text-gray-400">{new Intl.NumberFormat('en-IN').format(s_amount)} {s_currency}</span>
        </div>

        <div className="text-2xl text-blue-500 font-bold">→</div>

        <div className="flex flex-col text-right">
          <span className="font-semibold text-lg text-black dark:text-white">{receiver_name}</span>
          <span className="text-gray-500 dark:text-gray-400">{new Intl.NumberFormat('en-IN').format(r_amount)} {r_currency}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="mt-3 inline-block text-left text-sm text-gray-500 dark:text-gray-400">
          Rate: 1 {s_currency} =&gt; {rate} {r_currency}
        </div>
        <div className="mt-3  inline-block text-right text-sm text-gray-500 dark:text-gray-400">
          <Link to={`/transaction/edit/${id}`} className="inline-block">
            <EditIcon />
          </Link>
          <div 
            className="ml-2 inline-block cursor-pointer"
            onClick={() =>{
              if (window.confirm("Are you sure you want to delete this transaction?")) {
                  deleteTransaction();
                }
            }}
            >
            <Deleteicon />
          </div >
        </div>
      </div>
      
    </div>
  );
}

export default TransactionCard;
