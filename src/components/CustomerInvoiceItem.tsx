import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Modal } from "./ui";
import InvoiceInfoModal from "./modals/InvoiceInfo";
import { useRef } from "react";
import { ModalRef } from "./ui/Modal";

type Props = {
  invoice: Invoice;
};

export default function CustomerInvoiceItem({ invoice }: Props) {
  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  return (
    <>
      <div
        onClick={() => modalRef.current?.open()}
        className="flex justify-between items-center pb-1.5 border-b border-black/10 last:border-none"
      >
        <div className="">
          <p className="text-[#333]">
            {convertFirestoreTimestampToString(invoice.created_at)}
          </p>
          <p className="text-xl text-xanh-500">
            {moneyFormat(invoice.total_price)}
          </p>
        </div>

        <ArrowRightIcon className="w-6" />
      </div>

      <Modal ref={modalRef}>
        <InvoiceInfoModal closeModal={closeModal} invoice={invoice} />
      </Modal>
    </>
  );
}
