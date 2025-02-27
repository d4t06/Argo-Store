import { useEffect, useState } from "react";
import CurrencyInput from "@/components/ui/CurrencyInput";
import ModalHeader from "../ui/ModalHeader";
import { Button, Input } from "../ui";
import { CheckIcon } from "@heroicons/react/16/solid";

type Base = {
  isFetching: boolean;
  closeModal: () => void;
  product: Product;
};

type Add = Base & {
  variant: "add";
  submit: (u: ProductUnit) => void;
};

type Edit = Base & {
  variant: "edit";
  submit: (u: ProductUnit) => void;
  productUnit: ProductUnit;
};

type Props = Add | Edit;

const initProductUnit = (data: Partial<ProductUnit>) => {
  const bucket: ProductUnit = {
    conversion_quantity: 0,
    price: 0,
    unit_name: "",
    ...data,
  };

  return {
    ...bucket,
    ...data,
  } as ProductUnit;
};

export default function AddProductUnitModal({ product, ...props }: Props) {
  const [unit, setUnit] = useState<ProductUnit>(
    props.variant === "edit"
      ? initProductUnit(props.productUnit)
      : initProductUnit({})
  );

  const isBaseUnit = product?.units.length === 0;

  const ableToSubmit =
    !!unit.unit_name && unit.price > 0 && unit.conversion_quantity > 0;

  const handleInput = (field: keyof ProductUnit, value: string) => {
    switch (field) {
      case "unit_name":
        setUnit({ ...unit, [field]: value });
        break;

      default:
        setUnit({ ...unit, [field]: +value });
    }
  };

  useEffect(() => {
    if (!product) return;

    if (isBaseUnit) handleInput("conversion_quantity", "1");
  }, []);

  const classes = {
    inputGroup: "gap-1",
    input: "p-2 bg-[#f1f1f1] border border-black/20 rounded-lg",
    label: "text-[#3f3f3f] text-lg",
  };

  if (!product) return;

  return (
    <>
      <ModalHeader title="Add unit" closeModal={props.closeModal} />

      <div className="space-y-3 pb-[50%] overflow-auto">
        <div className={classes.inputGroup}>
          <p className={classes.label}>Name:</p>
          <Input
            value={unit.unit_name}
            onChange={(e) => handleInput("unit_name", e.target.value)}
            placeholder="Enter name..."
          />
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Conversion:</p>
          <Input
            value={
              unit.conversion_quantity
                ? unit.conversion_quantity.toString()
                : ""
            }
            readOnly={isBaseUnit ? true : false}
            onChange={(e) =>
              !isNaN(+e.target.value)
                ? handleInput("conversion_quantity", e.target.value)
                : {}
            }
          />
        </div>

        <div className={classes.inputGroup}>
          <p className={classes.label}>Price:</p>

          <CurrencyInput
            setValue={(v) => handleInput("price", v + "")}
            value={unit.price}
          />
        </div>
      </div>

      <div className="text-center mt-5">
        <Button
          disabled={!ableToSubmit}
          loading={props.isFetching}
          onClick={() => ableToSubmit && props.submit(unit)}
        >
          <CheckIcon className="w-6" />
          <p className="text-white">Ok</p>
        </Button>
      </div>
    </>
  );
}
