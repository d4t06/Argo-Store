import Frame from "@/components/ui/Frame";
import { moneyFormat } from "@/utils/moneyFormat";
import useCreateReceipt from "@/hooks/useCreateReceipt";
import { Button, CurrencyInput } from "@/components/ui";
import { CheckIcon } from "@heroicons/react/16/solid";
import Header from "@/components/Header";
import NotFoundPage from "@/pages/NotFound";

export default function CreateReceiptPage() {
  const { addReceipt, isFetching, price, setPrice, currentCustomerData } =
    useCreateReceipt();

  if (!currentCustomerData) return <NotFoundPage />;

  const { customer } = currentCustomerData;

  return (
    <>
      <Header title="Create receive" />

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

      <div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
        <div className="container max-w-[800px] text-right">
          

          <Button
            disabled={!price || price > customer.total_debt}
            onClick={addReceipt}
            loading={isFetching}
          >
            <span>Ok</span>
            <CheckIcon className="w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
