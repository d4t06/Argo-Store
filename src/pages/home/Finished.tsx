import { Button } from "@/components/ui";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { HomeIcon, PrinterIcon } from "@heroicons/react/24/outline";
import NotFoundPage from "../NotFound";
import { useCartContext } from "@/stores/CartContext";
import usePrinter from "@/hooks/usePrinter";
import { myGetDoc } from "@/firebase/firebaseService";
import { generateInvoiceHtmnl } from "@/utils/generateInvoceHtml";
import { useEffect } from "react";

export default function FinishedPage() {
  const { newInvoiceId, resetCheckout } = useCheckoutContext();
  const { resetCart } = useCartContext();

  const { print, isPrinting, isOnMobile } = usePrinter();

  const handlePrint = async () => {
    if (!newInvoiceId.current) return;

    const docRef = await myGetDoc({
      collection: "Invoices",
      id: newInvoiceId.current,
    });

    const newInvoice = docRef.data() as Invoice;

    print(generateInvoiceHtmnl(newInvoice, isOnMobile));
  };

  useEffect(() => {
    resetCheckout();
    resetCart();
  }, []);

  if (!newInvoiceId.current) return <NotFoundPage />;

  return (
    <>
      <div className="m-auto">
        <img
          className="w-[140px] h-[140px] mx-auto"
          src="https://zalo-api.zadn.vn/api/emoticon/sticker/webpc?eid=46985&size=130"
          alt=""
        />
        <p className="text-center mt-3 text-xl font-[500]">Xong rồi đó fen!</p>
      </div>

      <div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
        <div className="container max-w-[800px] flex justify-between">
          <Button href="/">
            <HomeIcon className="w-6" />
            <span>Cút</span>
          </Button>
          <Button loading={isPrinting} onClick={handlePrint}>
            <span>Print</span>
            <PrinterIcon className="w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
