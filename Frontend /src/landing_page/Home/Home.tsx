
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import Filter from '../../icons/Filtericon';
import useTransaction from '../../hooks/useTransaction';

const Home = () => {

    const transactionData = useTransaction();

    console.log(transactionData);
    
    
    const [summary, setSummary] = useState({
        INR: 5000,
        USD: 2300,
        RUB: 10000,
        received: 15000,
        sent: 11000,
        transactions: 45
    });

    const ringData = [
        { id: 'INR', value: summary.INR, label: 'INR (₹)' },
        { id: 'USD', value: summary.USD, label: 'USD ($)' },
        { id: 'RUB', value: summary.RUB, label: 'RUB (₽)' },
    ];

    const lineChartData = [
        { date: '2025-04-01', amount: 300 },
        { date: '2025-04-05', amount: 800 },
        { date: '2025-04-10', amount: 1200 },
        { date: '2025-04-15', amount: 1500 },
        { date: '2025-04-20', amount: 900 },
        { date: '2025-04-25', amount: 1300 },
    ];

    const barChartData = [
        { currency: 'INR', received: 5000, sent: 4000 },
        { currency: 'USD', received: 3000, sent: 2500 },
        { currency: 'RUB', received: 7000, sent: 6000 },
    ];

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 dark:text-white">
            <h1 className=" text-3xl font-bold mb-3">Hello Vivek</h1>

            <h3 className='mb-2 text-blue-500'><Filter /> Filter</h3>
            
            {/* Summary Cards */}
            <div className="grid grid-flow-col grid-rows-3  gap-4 mb-10">
                {['INR', 'USD', 'RUB'].map((currency) => (
                    <div className="bg-white dark:bg-gray-800 shadow p-4 rounded-lg text-center" key={currency}>
                        <h2 className="text-xl font-semibold">{currency}</h2>
                        <p className="text-2xl mt-2">{new Intl.NumberFormat('en-IN').format(summary[currency as keyof typeof summary])}</p>
                    </div>
                ))}
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold">Received</h2>
                    <p className="text-2xl mt-2">{summary.received}</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold">Sent</h2>
                    <p className="text-2xl mt-2">{summary.sent}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold">Transactions</h2>
                    <p className="text-2xl mt-2">{summary.transactions}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 hover:bg-gray-500 dark:text-white p-4 rounded-lg shadow">
                    <h2 className="mb-4 font-semibold">📈 Received Over Time</h2>
                    <LineChart
                        xAxis={[{ data: lineChartData.map(d => d.date), scaleType: 'band' }]}
                        series={[{ data: lineChartData.map(d => d.amount), label: 'Received ₹' }]}
                        height={300}
                    />
                </div>
                <div className="bg-white dark:bg-gray-800 hover:bg-gray-500 p-4 rounded-lg shadow">
                    <h2 className="mb-4 font-semibold">📊 Sent vs Received</h2>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: barChartData.map(d => d.currency) }]}
                        series={[
                            { data: barChartData.map(d => d.received), label: 'Received' },
                            { data: barChartData.map(d => d.sent), label: 'Sent' },
                        ]}
                        height={300}
                    />
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-full">
                    <h2 className="mb-4 font-semibold">🧭 Currency Distribution</h2>
                    <PieChart series={[{ data: ringData, innerRadius: 60 }]} width={400} height={300} />
                </div>
            </div>
        </div>
    );
};

export default Home;