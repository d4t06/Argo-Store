import { Button } from "@/components/ui";
import { myGetDoc } from "@/firebase/firebaseService";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { generateInvoiceHtmnl } from "@/utils/generateInvoceHtml";
import { HomeIcon, PrinterIcon } from "@heroicons/react/24/outline";
// import { HomeIcon, PrinterIcon } from "react-native-heroicons/outline";

export default function FinishedPage() {
  const { newInvoiceId } = useCheckoutContext();

  const handlePrint = async () => {
    window.print()
    if (!newInvoiceId.current) return;

    // const docSnap = await myGetDoc({
    //   collection: "Invoices",
    //   id: newInvoiceId.current,
    // });
    // newInvoiceId.current = "";

    // const invoice = { ...docSnap.data(), id: docSnap.id } as Invoice;
  };

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
          <Button href={"/"}>
            <HomeIcon className="w-6" />
            <span>Cút</span>
          </Button>
          <Button onClick={handlePrint}>
            <span>Print</span>
            <PrinterIcon className="w-6" />
          </Button>
        </div>
      </div>
    </>
  );
}
