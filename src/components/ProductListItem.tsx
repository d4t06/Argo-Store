import { moneyFormat } from "@/utils/moneyFormat";
import simon_empty from "@/assets/images/simon_empty.png"

type Props = {
  product: Product;
  selected: boolean;
};

export default function ProductListItem({ product, selected }: Props) {
  return (
    <div className="flex">
      <img
      className="w-[70px] h-[70px]"
        src={
          product.image_url
            ? product.image_url
            : simon_empty
        }
      />

      <div className="ml-2 max-w-[60%]">
        <p
          className={`text-[18px] break-all  ${
            selected ? "text-xanh-500" : "text-[#1f1f1f]"
          }`}
        >
          {product.product_name}
        </p>

        <p className={`text-sm text-[#808080]`}>
          Stock: {product.stock}
        </p>
      </div>
      <div className="ml-auto flex-shrink-0 gap-1">
        {product.units.map((u, i) => (
          <div key={i}>
            <p className="text-[#808080]">{u.unit_name}:</p>
            <p className="text-red-500">
              {moneyFormat(u.price)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
