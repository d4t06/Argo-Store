import { useRef, useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { ModalRef } from "@/components/ui/Modal";
import NotFound from "@/components/ui/NoResult";
import { moneyFormat } from "@/utils/moneyFormat";
import useProductUnitAction from "@/hooks/useProductUnitAction";
import AddProductUnitModal from "./modals/AddProductUnit";
import { Button, Modal } from "./ui";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  productUnit: ProductUnit;
  index: number;
};

type Modal = "edit" | "delete";

export default function ProductUnitItem({ productUnit, index }: Props) {
  const [modal, setModal] = useState<Modal | "">("");

  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  const { actions, isFetching, currentProductData } = useProductUnitAction();

  type Edit = {
    type: "edit";
    unit: ProductUnit;
  };

  type Delete = {
    type: "delete";
  };

  const handleProductUnitAction = async (props: Edit | Delete) => {
    try {
      switch (props.type) {
        case "edit":
          await actions({
            type: "Edit",
            index,
            unit: props.unit,
          });
          break;

        case "delete":
          await actions({
            type: "Delete",
            index,
          });
          break;
      }

      setModal("");
    } catch (error) {
      console.log(error);
    }
  };

  const renderModal = () => {
    if (!currentProductData || !modal) return <NotFound />;

    switch (modal) {
      case "edit":
        return (
          <AddProductUnitModal
            variant="edit"
            closeModal={closeModal}
            isFetching={isFetching}
            product={currentProductData.product}
            productUnit={productUnit}
            submit={(unit) => handleProductUnitAction({ type: "edit", unit })}
          />
        );

      case "delete":
        return (
          <ConfirmModal
            callback={() => handleProductUnitAction({ type: "delete" })}
            close={closeModal}
            loading={isFetching}
          />
        );
    }
  };

  return (
    <div className="bg-gray-100 border border-black/10 p-2 rounded-md">
      <p className="text-center font-[500] text-lg line-clamp-1">{productUnit.unit_name}</p>

      <div className="gap-2 mt-3">
        <p className="text-md text-[#888] font-[500]">
          x{productUnit.conversion_quantity}
        </p>
        <p className="text-md text-red-500 font-[500]">
          {moneyFormat(productUnit.price)}
        </p>
      </div>

      <div className="flex gap-2 justify-center mt-5">
        <Button
          onClick={() => openModal("delete")}
          size={"clear"}
          className="p-1.5"
        >
          <TrashIcon className="w-6" />
        </Button>

        <Button
          onClick={() => openModal("edit")}
          size={"clear"}
          className="p-1.5"
        >
          <PencilSquareIcon className="w-6" />
        </Button>
      </div>

      <Modal ref={modalRef}>{renderModal()}</Modal>
    </div>
  );
}
