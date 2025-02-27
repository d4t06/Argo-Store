import { useRef } from "react";
import { Button, Modal } from "./ui";
import { PlusIcon } from "@heroicons/react/16/solid";
import AddProductModal from "./modals/AddProductModal";
import { ModalRef } from "./ui/Modal";
import { useAuth } from "@/stores/AuthContext";

export default function AddProductBtn() {
  const { user } = useAuth();
  const modalRef = useRef<ModalRef>(null);

  if (!user) return <></>;

  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        size={"clear"}
        className="p-2 !absolute right-[10px]  bottom-5"
      >
        <PlusIcon className="w-6" />
        <span>Add product</span>
      </Button>

      <Modal ref={modalRef}>
        <AddProductModal
          variant="add"
          email={user.email}
          closeModal={() => modalRef.current?.close()}
        />
      </Modal>
    </>
  );
}
