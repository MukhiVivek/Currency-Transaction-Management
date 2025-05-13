import { LineChart, PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import Filter from '../../icons/Filtericon';
import UseHomeData from './HomeData';
import { useUser } from '../../hooks/useUser';

interface SummaryProps {
    INR: number;
    USD: number;
    RUB: number;
    filteredData: number;
}

const Home = () => {
    const userData : any = useUser();
    
    const [Day, setDay] = useState<number>(1); // 1, 7, 30, 0 (0 = all)

    const filteredData = UseHomeData(Day);

    const totalReceivedINR = filteredData
        .filter((tx) => tx.r_currency === 'INR')
        .reduce((sum, tx) => sum + tx.r_amount, 0);

    const transactionCount = filteredData.length;

    const totalReceivedUSD = filteredData
        .filter((tx) => tx.r_currency === 'USD')
        .reduce((sum, tx) => sum + tx.r_amount, 0);

    const totalReceivedRUB = filteredData
        .filter((tx) => tx.r_currency === 'RUB')
        .reduce((sum, tx) => sum + tx.r_amount, 0);

    const [summary, setSummary] = useState<SummaryProps>({
        INR: 0,
        USD: 0,
        RUB: 0,
        filteredData: 0,
    });
    useEffect(() => {
        setSummary({
            INR: totalReceivedINR,
            USD: totalReceivedUSD,
            RUB: totalReceivedRUB,
            filteredData: transactionCount,
        });
    }, [filteredData]);

    const ringData = [
        { id: 'INR', value: summary.INR, label: `${new Intl.NumberFormat('en-IN').format(summary.INR)} (₹)` },
        { id: 'USD', value: summary.USD, label: `${new Intl.NumberFormat('en-IN').format(summary.USD)} ($)` },
        { id: 'RUB', value: summary.RUB, label: `${new Intl.NumberFormat('en-IN').format(summary.RUB)} (₽)` },
    ];

    const lineChartDataMap = new Map<string, number>();

    const Day30Data = UseHomeData(30);

    Day30Data.forEach((tx) => {
        const date = new Date(tx.date).toLocaleDateString();
        const amount = tx.r_currency === 'INR' ? tx.r_amount : 0;

        if (lineChartDataMap.has(date)) {
            lineChartDataMap.set(date, lineChartDataMap.get(date)! + amount);
        } else {
            lineChartDataMap.set(date, amount);
        }
    });

    const lineChartData = Array.from(lineChartDataMap.entries()).map(([date, amount]) => ({
        date,
        amount,
    }));


    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 dark:text-white">

            <div className='flex items-center justify-between mb-6'>
                <h1 className=" text-3xl font-bold mb-3">Hello {userData.data.username}</h1>
                <div className='flex items-center justify-center'>

                    <select
                        onChange={(e) => setDay(Number(e.target.value))}
                        className='p-2 m-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    >
                        <option key={1} value={1}>Today</option>
                        <option key={7} value={7}>7 Days</option>
                        <option key={30} value={30}>30 Days</option>
                        <option key={0} value={0}>All Time</option>
                    </select>
                    <div className=' text-blue-500 flex  items-center'><Filter />Filter</div>
                </div>

            </div>

            {/* Summary Cards */}
            <div className="grid grid-flow-col grid-rows-2  gap-4 mb-10">
                {['INR', 'USD', 'RUB'].map((currency) => (
                    <div className="bg-white dark:bg-gray-900 shadow p-4 rounded-lg text-center" key={currency}>
                        <h2 className="text-xl font-semibold">{currency}</h2>
                        <p className="text-2xl mt-2">{new Intl.NumberFormat('en-IN').format(summary[currency as keyof typeof summary])}</p>
                    </div>
                ))}
                <div className="bg-blue-100 dark:bg-gray-900 p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold">Transaction Count</h2>
                    <p className="text-2xl mt-2">{summary.filteredData}</p>
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
                    <h2 className="mb-4 font-semibold">🧭 Currency Distribution</h2>
                    <PieChart series={[{ data: ringData, innerRadius: 60 }]} width={400} height={300} />
                </div>
            </div>
        </div>
    );
};

export default Home;