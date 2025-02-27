import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Frame, Modal } from "./ui";
import { useRef } from "react";
import { ModalRef } from "./ui/Modal";
import ReceiveInfoModal from "./modals/ReceiveInfo";

type Props = {
  receiving: Receiving;
};

export default function ReceivingItem({ receiving }: Props) {
  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  return (
    <>
      <Frame onClick={() => modalRef.current?.open()} className="flex items-center justify-between">
        <div>
          <p>{convertFirestoreTimestampToString(receiving.created_at)}</p>

          <p className="text-lg text-xanh-500">
            {moneyFormat(receiving.total_price)}
          </p>
        </div>

        <ArrowRightIcon className="w-6" />
      </Frame>

      <Modal ref={modalRef}>
        <ReceiveInfoModal closeModal={closeModal} receiving={receiving} />
      </Modal>
    </>
  );
}
