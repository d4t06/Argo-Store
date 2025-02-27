import useProductUnitAction from "@/hooks/useProductUnitAction";
import { useRef } from "react";
import { Button, Frame, Label, Modal } from "./ui";
import { PlusIcon } from "@heroicons/react/16/solid";
import AddProductUnitModal from "./modals/AddProductUnit";
import ProductUnitItem from "./ProductUnitItem";
import { ModalRef } from "./ui/Modal";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

type Modal = "add-price";

export default function ProductUnits() {
  const { currentProductData, actions, isFetching } = useProductUnitAction();

  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  const handleAddProductUnit = async (unit: ProductUnit) => {
    await actions({ type: "Add", unit });
    closeModal();
  };

  if (!currentProductData) return;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label icon={<CurrencyDollarIcon className="w-6" />} title="Unit" />

        <Button
          onClick={() => modalRef.current?.open()}
          size={"clear"}
          className="p-1.5"
        >
          <PlusIcon className="w-6" />
          <span className="text-white">Add unit</span>
        </Button>
      </div>

      <Frame>
        {currentProductData.product.units.length ? (
          <div className="flex flex-wrap -mt-1 -mx-1">
            {currentProductData.product.units.map((pU, i) => (
              <div className="w-1/2 h-full px-1 mt-2" key={i}>
                <ProductUnitItem productUnit={pU} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">¯\_(ツ)_/¯</p>
        )}
      </Frame>

      <Modal ref={modalRef}>
        <AddProductUnitModal
          variant="add"
          product={currentProductData.product}
          submit={handleAddProductUnit}
          isFetching={isFetching}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
}
