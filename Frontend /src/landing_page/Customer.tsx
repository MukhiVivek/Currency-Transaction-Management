import { Link } from "react-router-dom";
import { CustomerCards } from "../components/CustomerCard";
import { useCustomer } from "../hooks/useCustomer";

interface CustomerCardProps {
  name: string;
  INR: number;
  RUB: number;
  USD: number;
  _id: string;
}

const customer = () => {

  const { data } = useCustomer();

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        {data.map((customer: CustomerCardProps) =>
        <Link to={`/customer/${customer._id}`} key={customer._id}>
          <CustomerCards name={customer.name} INR={customer.INR} RUB={customer.RUB} USD={customer.USD} />
        </Link>
        )}
      </div>
      
    </>
  );
};


export default customer;
