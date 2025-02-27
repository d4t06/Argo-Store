import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";

import usePrinter from "@/hooks/usePrinter";
import { generateInvoiceHtmnl } from "@/utils/generateInvoceHtml";
import { useInvoiceContext } from "@/stores/local/InvoicesContext";
import { Button, Frame, Label, NoResult } from "@/components/ui";
import {
  DocumentTextIcon,
  PrinterIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import CheckoutInvoiceItem from "@/components/CheckoutInvoiceItem";
import Header from "@/components/Header";

export default function InvoiceDetailPage() {
  const { currentInvoiceData } = useInvoiceContext();

  const printer = usePrinter();

  const handlePrint = () => {
    if (!currentInvoiceData) return;
    const { invoice } = currentInvoiceData;

    const content = generateInvoiceHtmnl(
      invoice,
      convertFirestoreTimestampToString(invoice.created_at),
    );

    printer(content);
  };

  if (!currentInvoiceData) return <NoResult />;
  const { invoice } = currentInvoiceData;

  return (
    <>
      <Header title="Invoice detail" />

      <div className="overflow-auto pb-20">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label
              icon={<DocumentTextIcon className="w-6" />}
              title="Invoice info"
            />
            <Frame className="space-y-2.5">
              <div className="">
                <p className="text-[#333]">Customer:</p>
                <p className="text-2xl">{invoice.customer_name}</p>
              </div>

              <div className="">
                <p className="text-[#333]">Date:</p>
                <p className="">
                  {convertFirestoreTimestampToString(invoice.created_at)}
                </p>
              </div>

              <div className="">
                <p className="text-[#333]">Payment:</p>
                <p className="">
                  {invoice.payment === "no" ? "No" : "Tien mat"}
                </p>
              </div>

              <div className="">
                <p className="text-[#333]">Total:</p>
                <p className="text-2xl">{moneyFormat(invoice.total_price)}</p>
              </div>
            </Frame>
          </div>

          <div className="space-y-1.5">
            <Label
              icon={<ShoppingBagIcon className="w-6" />}
              title="Products"
            />
            <Frame className="space-y-1.5">
              {invoice.items.map((iItem, i) => (
                <CheckoutInvoiceItem invoiceItem={iItem} key={i} />
              ))}
            </Frame>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePrint}
        size={"clear"}
        className="p-2 !absolute bottom-7 right-5"
      >
        <PrinterIcon className="w-6" />
      </Button>
    </>
  );
}
