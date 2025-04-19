// import MoneyIcon from "../icons/MoneyIcon";

import TransactionCard from "../components/TransactionCard";
import useTransaction from "../hooks/useTransaction";

interface data {
  date: string;
  sender_id: {
    name: string;
    amount: number;
    phone: number;
  };
  s_amount: number;
  s_currency: string;
  receiver_id: {
    name: string;
    amount: number; 
    phone: number;
  };
  r_amount: number;
  r_currency: string;
  rate: number;
  status: string;
}

function Transation() {

  const data = useTransaction().slice().reverse();

  return (
    <div className="mx-2">
    {data.map((transaction : data) =>
      <TransactionCard  date={transaction.date} sender_name={transaction.sender_id.name} s_amount={transaction.s_amount} s_currency={transaction.s_currency} receiver_name={transaction.receiver_id.name} r_amount={transaction.r_amount} r_currency={transaction.r_currency} rate={transaction.rate} status={transaction.status} />
    )}
    </div>
  );
}

export default Transation;