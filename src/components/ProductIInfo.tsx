import { ModalRef } from "@/components/ui/Modal";
import { useRef } from "react";
import { useProductContext } from "@/stores/ProductContext";
import { moneyFormat } from "@/utils/moneyFormat";
import simon from "@/assets/images/simon_empty.png";
import { Button, Frame, Label, Modal } from "./ui";
import AddProductModal from "./modals/AddProductModal";
import { DocumentTextIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function ProductInfo() {
  const { currentProductData } = useProductContext();

  const modalRef = useRef<ModalRef>(null);

  const closeModal = () => modalRef.current?.close();

  const classes = {
    inputGroup: "",
    value: "text-lg",
    label: "text-[#888]",
  };

  if (!currentProductData) return;

  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <Label icon={<DocumentTextIcon className="w-6" />} title="Info" />

        <Button
          onClick={() => modalRef.current?.open()}
          className="p-1.5"
          size={"clear"}
        >
          <PencilSquareIcon className="w-6" />
          <p className="text-white">Edit</p>
        </Button>
      </div>

      <Frame className="space-y-2.5">
        <img
          style={{ height: 70, width: 70 }}
          src={
            currentProductData.product.image_url
              ? currentProductData.product.image_url
              : simon
          }
        />

        <div className={classes.inputGroup}>
          <p className={classes.label}>Name:</p>

          <p className={classes.value}>
            {currentProductData.product.product_name}
          </p>
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Bar Code:</p>

          <p className={classes.value}>{currentProductData.product.barcode}</p>
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Debt price:</p>

          <p className={classes.value}>
            {moneyFormat(currentProductData.product.debt_price)}
          </p>
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Stock price:</p>

          <p className={classes.value}>
            {moneyFormat(currentProductData.product.stock_price)}
          </p>
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Stock:</p>

          <p className={classes.value}>{currentProductData.product.stock}</p>
        </div>
      </Frame>

      <Modal ref={modalRef}>
        <AddProductModal
          closeModal={closeModal}
          variant="edit"
          product={currentProductData.product}
        />
      </Modal>
    </div>
  );
}
