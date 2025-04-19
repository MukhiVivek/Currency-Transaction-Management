import axios from 'axios';
import React, { useState } from 'react';
import { BACKEND_URL } from '../Config';
import { useCustomer } from '../hooks/useCustomer';

const currencies = ['INR', 'USD', 'RUB'];

const TransitionPag: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderAmount, setSenderAmount] = useState<number>();
  const [senderCurrency, setSenderCurrency] = useState('INR');

  const [receiverName, setReceiverName] = useState('');
  const [receiverAmount, setReceiverAmount] = useState<number>();
  const [receiverCurrency, setReceiverCurrency] = useState('INR');

  const [rate, setRate] = useState<number>(1);

  const [note, setNote] = useState<string>("");
  
  async function submit() {
    await axios.post(BACKEND_URL + "/api/v1/transaction/add", {
      sender_name: senderName,
      s_amount: senderAmount,
      s_currency: senderCurrency,
      receiver_name: receiverName,
      r_amount: receiverAmount,
      r_currency: receiverCurrency,
      rate: rate,
      status: "pending",
      note: note,
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    })

    alert(" Transaction Successfully Added");

    setvalue()
  }

  function setvalue() {
    setSenderName("");
    setSenderAmount(0);
    setReceiverName("");
    setReceiverAmount(0);
    setRate(1);
  }

  const inputClass = "w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
  const selectClass = "p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  const { data } = useCustomer();

  return (
    <div className="bg-white dark:bg-black p-4 sm:p-6 rounded-none sm:rounded-2xl shadow-none sm:shadow-lg w-full min-h-screen  justify-between">
      <div className="space-y-6">
        {/* Sender Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Sender</h2>
          <input
            type="text"
            placeholder="Sender Name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className={inputClass}
            list="customer_name"
          />

          <div className="flex items-center gap-4 mt-3">
            <input
              type="number"
              placeholder="Amount"
              value={senderAmount}
              onChange={(e: any) => {
                setSenderAmount(Number(e.target.value));
                setReceiverAmount(Number(((e.target.value) * rate).toFixed(2)));
              }}
              className={inputClass}
            />

            <select
              value={senderCurrency}
              onChange={(e) => setSenderCurrency(e.target.value)}
              className={selectClass}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Rate Section */}
        <div className="text-center py-4">
          <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Exchange Rate</h2>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e: any) => {
              setRate(Number(e.target.value));
              setReceiverAmount(Number(((senderAmount ? senderAmount : 0) * e.target.value).toFixed(2)));
            }}
            className="w-32 text-center p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Receiver Section */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2 text-black dark:text-white">Receiver</h2>
          <input
            type="text"
            placeholder="Receiver Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            className={inputClass}
            list="customer_name"
          />
          <div className="flex items-center gap-4 mt-3">
            <input
              type="number"
              placeholder="Amount"
              value={receiverAmount}
              onChange={(e) => setReceiverAmount(Number(e.target.value))}
              className={inputClass}
            />
            <select
              value={receiverCurrency}
              onChange={(e) => setReceiverCurrency(e.target.value)}
              className={selectClass}
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">Note</label>
          <textarea
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
      </div>

      {/* Submit Button */}
      <div className="pt-10">
        <button
          onClick={submit}
          className="w-full py-3 bg-blue-600 text-white  rounded-xl hover:bg-blue-700 transition-all"
        >
          Submit Transaction
        </button>
      </div>
      <datalist id="customer_name">
        {data.map((c: any) =>
          <option value={c.name} />
        )}
      </datalist>
    </div>
  );
};

export default TransitionPag;
