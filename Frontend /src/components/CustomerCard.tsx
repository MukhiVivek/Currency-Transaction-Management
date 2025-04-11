import { useEffect, useState } from "react";

interface CustomerCardProps {
    name: string;
    i_balance: number;
    r_balance: number;
    u_balance: number;
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


export function CustomerCards({ name, i_balance, r_balance, u_balance }: CustomerCardProps) {

    const [inr , setInr] = useState<boolean | null>(null);
    const [rub , setRub] = useState<boolean | null>(null);
    const [usd , setUsd] = useState<boolean | null>(null);

    useEffect(() => {
        if(i_balance === 0){
            setInr(false);
          }else{
            setInr(true);
          }
          if(r_balance === 0){
            setRub(false);
          }else{
            setRub(true);
          }
          if(u_balance === 0){
            setUsd(false);
          }else{
            setUsd(true);
          }

          if(i_balance === 0 && r_balance === 0 && u_balance === 0){
            setInr(true);
          }
          
    }, [i_balance, r_balance, u_balance]);

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

            <span className="text-left items-end font-semibold text-green-600 dark:text-green-400">
                <div className="">
                    {inr ? `₹ ${new Intl.NumberFormat('en-IN').format(i_balance)}` : null}
                </div>
                <div>
                    {rub ? `₽ ${new Intl.NumberFormat('en-IN').format(r_balance)}` : null}
                </div>
                <div >
                    {usd ? `$ ${new Intl.NumberFormat('en-IN').format(u_balance)}` : null}
                </div>  
            </span>
        </div>
    )
}

