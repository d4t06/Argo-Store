import { Frame } from "./ui";

type Props = {
  customer: Customer;
  className?: string;
  onClick?: () => void;
};

export default function CustomerItem({
  customer,
  onClick,
  className = "",
}: Props) {
  return (
    <Frame onClick={onClick} className={`flex-row ${className}`}>
      <div className="ml-2">
        <p className={`text-lg`}>{customer.customer_name}</p>

        <div className="mt-1">
          {!!customer.phone_number && (
            <p className="text-[#3f3f3f]">{customer.phone_number}</p>
          )}
        </div>
      </div>
    </Frame>
  );
}
