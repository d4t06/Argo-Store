import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "./Button";

export default function ModalHeader({
  closeModal,
  title,
}: {
  closeModal: () => void;
  title: string;
}) {
  return (
    <div className={`flex justify-between mb-5`}>
      <p className="text-xl font-[500]">{title}</p>
      <Button
        color={"second"}
        size={"clear"}
        className="p-1"
        onClick={closeModal}
      >
        <XMarkIcon className="w-6" />
      </Button>
    </div>
  );
}
