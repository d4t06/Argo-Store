import { useMemo, useState } from "react";
import useDebounce from "./useDebounced";
import { useCustomerContext } from "@/stores/CustomerContext";

export default function useSearchCustomer() {
  const { customers } = useCustomerContext();

  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 800);

  const _customers = useMemo(
    () =>
      debouncedValue
        ? customers.filter((p) => p.customer_name.includes(debouncedValue))
        : customers,
    [debouncedValue, customers],
  );

  return { value, setValue, _customers };
}
