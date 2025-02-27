import { convertToEn, initProductObject } from "@/utils/appHelper";
import { useState } from "react";
import useProductAction from "@/hooks/useProductAction";
import { Input, CurrencyInput, Button } from "../ui";
import ModalHeader from "../ui/ModalHeader";
import { CheckIcon } from "@heroicons/react/24/outline";

type Base = {
  closeModal: () => void;
};

type AddProduct = {
  variant: "add";
  email: string;
};

type EditProduct = {
  variant: "edit";
  product: Product;
};

type Props = AddProduct | EditProduct;

const runInitProductData = (props: Props) => {
  switch (props.variant) {
    case "add":
      return initProductObject({
        user_email: props.email,
      });
    case "edit":
      const { id, ...rest } = props.product;
      return initProductObject(rest);
  }
};

export default function AddProductModal({
  closeModal,
  ...props
}: Props & Base) {
  const [productData, setProductData] = useState<ProductSchema>(() =>
    runInitProductData(props),
  );

  const { action, isFetching } = useProductAction();

  const ableToSubmit =
    !!productData.product_name &&
    +productData.stock_price > 0 &&
    +productData.debt_price > 0 &&
    !!productData.product_name_ascii;

  const handleInput = (field: keyof Product, value: string) => {
    switch (field) {
      case "stock_price":
      case "debt_price":
        if (!isNaN(+value))
          return setProductData({ ...productData, [field]: +value });
        else if (!value) {
          return setProductData({ ...productData, [field]: 0 });
        } else return;

      case "product_name":
        return setProductData({
          ...productData,
          ["product_name_ascii"]: convertToEn(value),
          ["product_name"]: value,
        });
    }

    setProductData({ ...productData, [field]: value });
  };

  const handleProductAction = async () => {
    try {
      switch (props.variant) {
        case "add":
          await action({ type: "add", product: productData });

          break;
        case "edit":
          if (props.variant !== "edit") return;
          await action({
            type: "edit",
            product: productData,
            id: props.product.id,
            index: 0,
          });

          break;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const classes = {
    inputGroup: "gap-1",
    input: "p-2 bg-[#f1f1f1] border border-black/20 rounded-lg",
    label: "text-[#3f3f3f] text-lg",
  };

  return (
    <>
      <ModalHeader title="Add product" closeModal={closeModal} />

      <div className="space-y-3 overflow-auto pb-[50%]">
        <div className="w-[160px] h-[160px] bg-[#f1f1f1] rounded-lg"></div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Name:</p>
          <Input
            value={productData.product_name}
            onChange={(e) => handleInput("product_name", e.target.value)}
            placeholder="Enter name..."
            className={classes.input}
          />
        </div>

        <div className={classes.inputGroup}>
          <label htmlFor="price" className={classes.label}>
            Stock price:
          </label>

          <CurrencyInput
            value={productData.stock_price}
            setValue={(v) => handleInput("stock_price", v + "")}
          />
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Debt price:</p>

          <CurrencyInput
            value={productData.debt_price}
            setValue={(v) => handleInput("debt_price", v.toString())}
          />
        </div>
      </div>

      <div className="mt-3 text-center">
        <Button
          disabled={!ableToSubmit}
          loading={isFetching}
          onClick={handleProductAction}
        >
          <CheckIcon className="w-6" />
          <p className="text-white">Save</p>
        </Button>
      </div>
    </>
  );
}
