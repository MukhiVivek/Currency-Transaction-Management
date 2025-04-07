
function Home() {
    return (
        <div className="h-full">
            <div className="fixed top-0 w-full bg-white  dark:bg-black dark:text-white ">
                <Top />
            </div>
            <div className="pt-8 px-2">
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            <Mid />
            </div>
            
            
        </div>
    );
}

function Top() {
    return (
        <div className="flex justify-center text-2xl ">
            <div className="grow border rounded-tl-lg rounded-bl-lg p-2 text-center">$ 1000</div>
            <div className="grow border p-2 text-center">₹ 200000</div>
            <div className="grow border rounded-tr-lg rounded-br-lg p-2 text-center">& 3000000</div>
        </div>
    )
}
function Mid() {
    return (
        
        <div className="flex items-center gap-4 text-2xl my-2 border-black dark:border-white border-b py-4 px-1  " >
            <div>
                <div className="text-center bg-pink-400 rounded-4xl w-10 h-10 text-4xl">
                    M
                </div>
            </div>
            <div>Mukhi vivek </div>
            <div className="ml-auto">
                <div >
                    2000 ₹
                </div>
            </div>
        </div>
    )
}


export default Home;