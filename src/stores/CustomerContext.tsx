import { createContext, ReactNode, useContext, useRef, useState } from "react";

function useCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [currentCustomerData, setCurrentCustomerData] = useState<
    { customer: Customer; index: number } | undefined
  >();
  const shouldFetchCustomer = useRef(true);

  return {
    customers,
    setCustomers,
    currentCustomerData,
    shouldFetchCustomer,
    setCurrentCustomerData,
  };
}

type ContextType = ReturnType<typeof useCustomer>;

const Context = createContext<ContextType | null>(null);

export default function CustomerProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <Context.Provider value={useCustomer()}>{children}</Context.Provider>;
}

export const useCustomerContext = () => {
  const ct = useContext(Context);

  if (!ct) throw new Error("Customer context is not provided");

  return ct;
};
