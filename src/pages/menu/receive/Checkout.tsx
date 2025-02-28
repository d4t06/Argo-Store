import CheckoutReceivingItem from "@/components/CheckoutReceivingItem";
import Header from "@/components/Header";
import { Frame, Label, Button } from "@/components/ui";
import useConfirmReceiving from "@/hooks/useConfirmReceice";
import NotFoundPage from "@/pages/NotFound";
import { useReceivingCartContext } from "@/stores/local/ReceivingCartContext";
import { moneyFormat } from "@/utils/moneyFormat";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function ReceivingCheckoutPage() {
  const { receiving } = useReceivingCartContext();

  const { placeOrder, isFetching } = useConfirmReceiving();

  if (!receiving) return <NotFoundPage />;

  return (
    <>
      <Header title="Receive checkout" />

      <div className="flex-1 pb-10 overflow-auto">
        <div className="space-y-1">
          <Label title="Products" icon={<ShoppingBagIcon className="w-6" />} />
          <Frame>
            <div className="spacey-1.5">
              {receiving.items.map((item, i) => (
                <CheckoutReceivingItem receivingItem={item} key={i} />
              ))}
            </div>
            <div className="mt-5">
              <p>Total:</p>
              <p className="text-2xl font-[500]">
                {moneyFormat(receiving.total_price)}
              </p>
            </div>
          </Frame>
        </div>
      </div>

      <div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
        <div className="container max-w-[800px] flex justify-between">
          <Button href="/menu/receive/cart">
            <ChevronLeftIcon className="w-6" />
            <span>Cart</span>
          </Button>
          <Button loading={isFetching} onClick={placeOrder}>
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    </>
  );
}
