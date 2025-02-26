import { useMemo, useState } from "react";
import useDebounce from "./useDebounced";
import { useProductContext } from "@/stores/ProductContext";
import { convertToEn } from "@/utils/appHelper";

export default function useSearchProduct() {
  const { products } = useProductContext();

  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 800);

  const _products = useMemo(
    () =>
      debouncedValue
        ? products.filter((p) =>
            p.product_name_ascii.includes(convertToEn(debouncedValue)),
          )
        : products,
    [debouncedValue, products],
  );

  return { value, setValue, _products };
}
