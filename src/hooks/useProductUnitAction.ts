import { myDeleteDoc, mySetDoc } from "@/firebase/firebaseService";
import { useCartContext } from "@/stores/CartContext";
import { useProductContext } from "@/stores/ProductContext";
import { sleep } from "@/utils/appHelper";
import { useState } from "react";

export default function useProductUnitAction() {
  const [isFetching, setIsFetching] = useState(false);
  const { resetSelect } = useCartContext();

  const { currentProductData, action: productActions } = useProductContext();

  type Add = {
    type: "Add";
    unit: ProductUnit;
  };

  type Edit = {
    type: "Edit";
    unit: ProductUnit;
    index: number;
  };

  type Delete = {
    type: "Delete";
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    if (!currentProductData) return;

    try {
      setIsFetching(true);
      resetSelect();

      if (process.env.NODE_ENV === "development") await sleep(300);

      switch (props.type) {
        case "Add":
          const { unit } = props;

          const { id, ...product } = currentProductData.product;

          const newUnits = [...product.units, unit];

          Object.assign(product, {
            units: newUnits,
          } as Partial<Product>);

          await mySetDoc({
            collection: "Products",
            data: product,
            id,
          });

          productActions({
            type: "edit",
            product: { units: newUnits },
            index: currentProductData.index,
          });

          break;
        case "Edit": {
          const { unit, index } = props;

          const newUnits = [...currentProductData.product.units];
          Object.assign(newUnits[index], unit);

          await mySetDoc<Product>({
            collection: "Products",
            id: currentProductData.product.id,
            data: { units: newUnits },
          });

          productActions({
            type: "edit",
            index: currentProductData.index,
            product: {
              units: newUnits,
            },
          });

          break;
        }

        case "Delete": {
          const { index } = props;

          const newUnits = [...currentProductData.product.units];

          newUnits.splice(index, 1);

          await myDeleteDoc({
            collection: "Products",
            id: currentProductData.product.id,
          });

          productActions({
            type: "edit",
            index: currentProductData.index,
            product: {
              units: newUnits,
            },
          });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, actions, currentProductData };
}
