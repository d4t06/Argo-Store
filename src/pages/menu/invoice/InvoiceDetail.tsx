import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";

// import { generateInvoiceHtmnl } from "@/utils/generateInvoceHtml";
import { useInvoiceContext } from "@/stores/local/InvoicesContext";
import { Button, Frame, Label } from "@/components/ui";
import {
  DocumentTextIcon,
  PrinterIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import CheckoutInvoiceItem from "@/components/CheckoutInvoiceItem";
import Header from "@/components/Header";
import MenuBtn from "@/components/MenuBtn";
import NotFoundPage from "@/pages/NotFound";
import usePrinter from "@/hooks/usePrinter";
import { generateInvoiceHtmnl } from "@/utils/generateInvoceHtml";
// import PrintModal from "@/components/ui/PrintModal";
// import { useState } from "react";

export default function InvoiceDetailPage() {
  const { currentInvoiceData } = useInvoiceContext();

  const { isPrinting, print, isOnMobile } = usePrinter();

  // const [isOpen, setIsOpen] = useState(false);

  const handlePrint = () => {
    if (!currentInvoiceData) return;

    print(generateInvoiceHtmnl(currentInvoiceData.invoice, isOnMobile));
  };

  if (!currentInvoiceData) return <NotFoundPage />;

  const { invoice } = currentInvoiceData;

  return (
    <>
      <Header title="Invoice detail" />
      <MenuBtn />

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
        loading={isPrinting}
        className="p-2 !absolute bottom-5 right-5"
      >
        <PrinterIcon className="w-6" />
      </Button>

      {/* <PrintModal close={() => setIsOpen(false)} isOpen={isOpen}>
        <table className="w-full [&_td]:p-2 [&_td]:border [&_th]:border">
          <thead>
            <tr className="bg-[#f1f1f1]">
              <th className="text-center">STT</th>
              <th>Sản phẩm</th>
              <th>Đơn vị</th>
              <th>SL</th>
              <th>Giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="text-center font-bold">{i + 1}</td>
                <td>{item.product_name}</td>
                <td>{item.unit_name}</td>
                <td>{item.quantity}</td>
                <td>{moneyFormat(item.price)}</td>
                <td className="text-right">{moneyFormat(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PrintModal>*/}
    </>
  );
}
