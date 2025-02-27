import Frame from "@/components/ui/Frame";
import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";
import ModalHeader from "../ui/ModalHeader";
import CheckoutInvoiceItem from "../CheckoutInvoiceItem";
import { Button } from "../ui";
import { PrinterIcon } from "@heroicons/react/24/outline";
import usePrinter from "@/hooks/usePrinter";

type Props = {
  invoice: Invoice;
  closeModal: () => void;
};
export default function InvoiceInfoModal({ invoice, closeModal }: Props) {
  const printer = usePrinter();

  const handlePrint = async () => {
    await printer("asdfsdf");
  };

  return (
    <>
      <ModalHeader title="Invoice Detail" closeModal={closeModal} />

      <Frame>
        <div className="space-y-1">
          <p className="text-[#888]">Date:</p>
          <p className="text-lg">
            {convertFirestoreTimestampToString(invoice.created_at)}
          </p>
        </div>

        <div className="space-y-1 mt-3">
          <p className="text-[#888]">Total:</p>
          <p className="text-3xl">{moneyFormat(invoice.total_price)}</p>
        </div>
      </Frame>

      <Frame className="space-y-1.5 mt-3 overflow-auto">
        {invoice.items.map((iItem, i) => (
          <CheckoutInvoiceItem invoiceItem={iItem} key={i} />
        ))}
      </Frame>

      <p className="text-center mt-3">
        <Button onClick={handlePrint}>
          <PrinterIcon className="w-6" />
          <span>Print</span>
        </Button>
      </p>
    </>
  );
}
