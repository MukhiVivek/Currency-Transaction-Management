import { CustomerCards } from "../components/CustomerCard";
import { useCustomer } from "../hooks/useCustomer";

interface CustomerCardProps {
  name: string;
  i_balance: number;
  r_balance: number;
  u_balance: number;
}

const customer = () => {

  const { data } = useCustomer();

  console.log(data);

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        {data.map((customer: CustomerCardProps) =>
          <CustomerCards name={customer.name} i_balance={customer.i_balance} r_balance={customer.r_balance} u_balance={customer.u_balance} />
        )}
      </div>
    </>
  );
};


export default customer;
