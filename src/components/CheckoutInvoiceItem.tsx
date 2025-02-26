import { moneyFormat } from "@/utils/moneyFormat";

type Props = {
  invoiceItem: InvoiceItem;
};

export default function CheckoutInvoiceItem({ invoiceItem }: Props) {
  return (
    <div className="border-b border-b-black/10 py-1">
      <p className="text-lg font-[500]">{invoiceItem.product_name}</p>
      <div className="flex">
        <p className="text-[#808080]">
          {invoiceItem.quantity} x{" "}
          <p className="">{moneyFormat(invoiceItem.price)}</p>
        </p>
        <p className="ml-auto text-[#808080]">
          {moneyFormat(invoiceItem.quantity * invoiceItem.price)}
        </p>
      </div>
    </div>
  );
}
