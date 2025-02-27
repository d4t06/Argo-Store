import { moneyFormat } from "@/utils/moneyFormat";

type Props = {
  invoiceItem: InvoiceItem;
};

export default function CheckoutInvoiceItem({ invoiceItem }: Props) {
  return (
    <div className="border-b border-b-black/10 pb-1.5 last:border-none">
      <p className="text-lg font-[500]">{invoiceItem.product_name}</p>
      <div className="flex">
        <p className="text-[#888]">
          {invoiceItem.quantity} x{" "}
          <p className="">{moneyFormat(invoiceItem.price)}</p>
        </p>
        <p className="ml-auto text-[#888]">
          {moneyFormat(invoiceItem.quantity * invoiceItem.price)}
        </p>
      </div>
    </div>
  );
}
