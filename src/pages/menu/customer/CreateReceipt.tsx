import Frame from "@/components/ui/Frame";
import NotFound from "@/components/ui/NoResult";
import { moneyFormat } from "@/utils/moneyFormat";
import useCreateReceipt from "@/hooks/useCreateReceipt";
import { Button, CurrencyInput } from "@/components/ui";
import { CheckIcon } from "@heroicons/react/16/solid";

export default function CreateReceiptPage() {
  const { addReceipt, isFetching, price, setPrice, currentCustomerData } =
    useCreateReceipt();

  if (!currentCustomerData) return <NotFound />;

  const { customer } = currentCustomerData;

  return (
    <>
      <Frame className="space-y-2">
        <div>
          <p className="text-[#333]">Customer:</p>
          <p className="text-3xl">{customer.customer_name}</p>
        </div>

        <div>
          <p className="text-[#333]">Totoal debt:</p>
          <button
            className="text-lg text-red-500"
            onClick={() => setPrice(customer.total_debt)}
          >
            {moneyFormat(customer.total_debt)}
          </button>
        </div>

        <div>
          <p className="text-[#333]">Price:</p>
          <CurrencyInput
            value={price}
            setValue={(v) => (!isNaN(+v) ? setPrice(+v) : {})}
          />
        </div>
      </Frame>
      <Button onClick={addReceipt} loading={isFetching} disabled={!price}>
        <CheckIcon className="w-6" />
        <span>Ok</span>
      </Button>
    </>
  );
}
