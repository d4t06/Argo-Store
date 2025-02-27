import { moneyFormat } from "@/utils/moneyFormat";

type Props = {
  receivingItem: ReceivingItem;
};

export default function CheckoutReceivingItem({ receivingItem }: Props) {
  return (
    <div className="border-b border-b-black/10 pb-1.5 last:border-none">
      <p className="text-lg font-[500]">{receivingItem.product_name}</p>
      <div className="flex">
        <p className="text-[#888]">
          {receivingItem.quantity} x <br />
          <span className="">{moneyFormat(receivingItem.price)}</span>
        </p>
        <p className="ml-auto text-[#888]">
          {moneyFormat(receivingItem.quantity * receivingItem.price)}
        </p>
      </div>
    </div>
  );
}
