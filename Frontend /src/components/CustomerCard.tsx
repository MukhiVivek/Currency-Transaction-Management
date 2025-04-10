
interface CustomerCardProps {
    name: string;
    balance: number;
}

const getRandomColor = (seed: string) => {
    const colors = [
        "bg-gradient-to-r from-pink-500 to-yellow-500",
        "bg-gradient-to-r from-blue-500 to-green-400",
        "bg-gradient-to-r from-purple-600 to-indigo-400",
        "bg-gradient-to-r from-yellow-400 to-red-500",
    ];
    const index = seed.charCodeAt(0) % colors.length;
    return colors[index];
};


export function CustomerCards({ name, balance }: CustomerCardProps) {

    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold ${getRandomColor(
                        name[0]
                    )}`}
                >
                    {name[0]?.toUpperCase()}
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {name}
                </span>
            </div>

            <span className="text-md font-semibold text-green-600 dark:text-green-400">
                ${balance}
            </span>
        </div>
    )
}

