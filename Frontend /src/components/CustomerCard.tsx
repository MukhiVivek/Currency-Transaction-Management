import { useEffect, useState } from "react";

interface CustomerCardProps {
    name: string;
    INR: number;
    RUB: number;
    USD: number;
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


export function CustomerCards({ name, INR, RUB, USD }: CustomerCardProps) {

    const [inr , setInr] = useState<boolean | null>(null);
    const [rub , setRub] = useState<boolean | null>(null);
    const [usd , setUsd] = useState<boolean | null>(null);

    useEffect(() => {
        if(INR === 0){
            setInr(false);
          }else{
            setInr(true);
          }
          if(RUB === 0){
            setRub(false);
          }else{
            setRub(true);
          }
          if(USD === 0){
            setUsd(false);
          }else{
            setUsd(true);
          }

          if(INR === 0 && RUB === 0 && USD === 0){
            setInr(true);
          }
          
    }, [INR, RUB, USD]);

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

            <span className="text-left items-end font-semibold ">
                <div className={INR > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {inr ? `₹ ${new Intl.NumberFormat('en-IN').format(Math.abs(INR))}` : null}
                </div>
                <div className={RUB > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {rub ? `₽ ${new Intl.NumberFormat('en-IN').format(Math.abs(RUB))}` : null}
                </div>
                <div className={USD > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                    {usd ? `$ ${new Intl.NumberFormat('en-IN').format(Math.abs(USD))}` : null}
                </div>  
            </span>
        </div>
    )
}

