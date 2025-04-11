
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../Config";

const CustomerAdd = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState<number>();
    const [inr, setInr] = useState<number>();
    const [rub, setRub] = useState<number>();
    const [usdt, setUsdt] = useState<number>();


    const handleSubmit = async () => {

        await axios.post(BACKEND_URL + "/api/v1/customer/add", {
            name: name,
            phone: phone,
            inr: inr,
            rub: rub,
            usdt: usdt,
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        alert("Customer Added Successfully");

    };

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex items-center justify-center text-white">
                <div
                    className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
                >
                    <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
                        Add New Customer
                    </h2>

                    {/* Name */}
                    <div className="mb-6">
                        <label className="block text-sm mb-2">Name</label>
                        <input
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-6">
                        <label className="block text-sm mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            onChange={(e) => setPhone(Number(e.target.value))}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* INR */}
                    <div className="mb-6">
                        <label className="block text-sm mb-2">INR Balance</label>
                        <input
                            type="number"
                            name="inr"
                            onChange={(e) => setInr(Number(e.target.value))}
                            placeholder="₹ Balance"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* RUB */}
                    <div className="mb-6">
                        <label className="block text-sm mb-2">RUB Balance</label>
                        <input
                            type="number"
                            name="rub"
                            onChange={(e) => setRub(Number(e.target.value))}
                            placeholder="₽ Balance"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* USDT */}
                    <div className="mb-8">
                        <label className="block text-sm mb-2">USDT Balance</label>
                        <input
                            type="number"
                            name="usdt"
                            onChange={(e) => setUsdt(Number(e.target.value))}
                            placeholder="$ Balance"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white text-lg font-semibold transition-all duration-300 shadow-lg"
                    >
                        Save Customer
                    </button>
                </div>
            </div>
        );
    };

    export default CustomerAdd;
