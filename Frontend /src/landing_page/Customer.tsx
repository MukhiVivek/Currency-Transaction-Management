import { CustomerCards } from "../components/CustomerCard";
import { useCustomer } from "../hooks/useCustomer";

interface CustomerCardProps {
  name: string;
  INR: number;
  RUB: number;
  USD: number;
}

const customer = () => {

  const { data } = useCustomer();

  console.log(data);

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        {data.map((customer: CustomerCardProps) =>
          <CustomerCards name={customer.name} INR={customer.INR} RUB={customer.RUB} USD={customer.USD} />
        )}
      </div>
    </>
  );
};


export default customer;
