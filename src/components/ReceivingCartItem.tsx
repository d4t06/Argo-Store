import { useReceivingCartContext } from "@/stores/local/ReceivingCartContext";
import simon from "@/assets/images/simon_empty.png";
import { Button, CurrencyInput, Input } from "./ui";
import { moneyFormat } from "@/utils/moneyFormat";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  cartItem: WarehouseCartItem;
  index: number;
};

export default function ReceivingCartItem({ cartItem, index }: Props) {
  const { updateCartItem, remove } = useReceivingCartContext();

  const classes = {
    Label: " text-[#333]",
  };

  return (
    <div className="flex">
      <img
        style={{ height: 70, width: 70, marginBottom: "auto" }}
        src={cartItem.image_url ? cartItem.image_url : simon}
      />

      <div className="space-y-2.5 flex-grow px-2">
        <div className="flex items-center justify-between flex-grow">
          <p className={`text-lg`}>{cartItem.product_name}</p>
          <p className="text-sm text-gray-500">(stock: {cartItem.stock})</p>

          <Button
            onClick={() => remove(index)}
            size={"clear"}
            className="ml-auto p-2"
          >
            <TrashIcon className="w-6" />
          </Button>
        </div>

        <div className="space-y-1 items-start">
          <p className={classes.Label}>Quantity:</p>

          <Input
            value={cartItem.quantity ? cartItem.quantity.toString() : ""}
            placeholder="0"
            onChange={(e) =>
              !isNaN(+e.target.value)
                ? updateCartItem({
                    index,
                    product: { quantity: +e.target.value },
                  })
                : {}
            }
          />
        </div>

        <div className="space-y-1">
          <p className={classes.Label}>Price:</p>
          <CurrencyInput
            value={cartItem.price}
            setValue={(v) =>
              updateCartItem({
                index,
                product: { price: +v },
              })
            }
          />
        </div>

        <p className="text-right mt-3 text-[#333]">
          Total:
          <span className="text-[18px]">
            {" "}
            {moneyFormat(cartItem.quantity * cartItem.price)}
          </span>
        </p>
      </div>
    </div>
  );
}
