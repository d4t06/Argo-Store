import Header from "@/components/Header";
import ReceivingCartItem from "@/components/ReceivingCartItem";
import { Button, Frame, Label, NoResult } from "@/components/ui";
import useCheckoutReceiving from "@/hooks/useCheckoutReceice";
import { useReceivingCartContext } from "@/stores/local/ReceivingCartContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function ReceivingCartPage() {
  const { cartItems } = useReceivingCartContext();

  const { checkout } = useCheckoutReceiving();

  const ableToSubmit = !cartItems.find((i) => i.quantity <= 0 || i.price <= 0);

  return (
    <>
      <Header title="Receive cart" />

      <div className="overflow-auto pb-[90px]">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label
              title="Products"
              icon={<ShoppingBagIcon className="w-6" />}
            />
            <Frame>
              {cartItems.length ? (
                <div className="space-y-3">
                  {cartItems.map((c, i) => (
                    <ReceivingCartItem index={i} key={i} cartItem={c} />
                  ))}
                </div>
              ) : (
                <NoResult less />
              )}
            </Frame>
          </div>
        </div>
      </div>

      <div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
        <div className="container max-w-[800px] flex justify-between">
          <Button href="/menu/receive/add">
            <ChevronLeftIcon className="w-6" />
            <span>Back</span>
          </Button>

          <Button disabled={!ableToSubmit} onClick={checkout}>
            <span>Checkout</span>
            <ChevronRightIcon className="w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
