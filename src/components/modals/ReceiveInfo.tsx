import Frame from "@/components/ui/Frame";
import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";
import ModalHeader from "../ui/ModalHeader";
import { Button } from "../ui";
import { PrinterIcon } from "@heroicons/react/24/outline";
import CheckoutReceivingItem from "../CheckoutReceivingItem";

type Props = {
  receiving: Receiving;
  closeModal: () => void;
};
export default function ReceiveInfoModal({ receiving, closeModal }: Props) {
  return (
    <>
      <ModalHeader title="Receiving Detail" closeModal={closeModal} />

      <Frame>
        <div className="space-y-1">
          <p className="text-[#888]">Date:</p>
          <p className="text-lg">
            {convertFirestoreTimestampToString(receiving.created_at)}
          </p>
        </div>

        <div className="space-y-1 mt-3">
          <p className="text-[#888]">Total:</p>
          <p className="text-3xl">{moneyFormat(receiving.total_price)}</p>
        </div>
      </Frame>

      <Frame className="space-y-1.5 mt-3 overflow-auto">
        {receiving.items.map((item, i) => (
          <CheckoutReceivingItem receivingItem={item} key={i} />
        ))}
      </Frame>

      <p className="text-center mt-3">
        <Button>
          <PrinterIcon className="w-6" />
          <span>Print</span>
        </Button>
      </p>
    </>
  );
}
