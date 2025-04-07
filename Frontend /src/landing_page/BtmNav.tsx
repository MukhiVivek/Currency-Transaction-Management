import Accounticon from "../icons/Accounticon";
import Homeicone from "../icons/Homeicone";
import Settingicon from "../icons/Settingicon";
import Transationicon from "../icons/Transationicon";
import { Link } from "react-router-dom";

export default function BtmNav() {
    return (
        <div className="flex items-center justify-center   text-2xl border-t border-white py-4 px-1">
            <div className="grow flex justify-center  "><Link rel="stylesheet" to="/" ><Homeicone /></Link></div>
            <div className="grow flex justify-center  "><Link rel="stylesheet" to="/transaction" ><Transationicon /></Link></div>
            <div className="grow flex justify-center  "><Link rel="stylesheet" to="/transition" >+</Link></div>
            <div className="grow flex justify-center  "><Link rel="stylesheet" to="/customer" ><Accounticon /></Link></div>
            <div className="grow flex justify-center  "><Link rel="stylesheet" to="/console" ><Settingicon /></Link></div>
        </div>
    )
}