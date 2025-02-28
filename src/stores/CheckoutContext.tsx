import { createContext, ReactNode, useContext, useMemo, useRef, useState } from "react";

type PayMethod = "tien-mat" | "no";

function useCheckout() {
  const [payMethod, setPayMethod] = useState<PayMethod>("tien-mat");
  const [customer, setCustomer] = useState<Customer>();
  const [ableToSubmit, setAbleToSubmit] = useState(false);

  const [invoice, setInvoice] = useState<InvoiceSchema>();

  const newInvoiceId = useRef("");

  const totalInvoicePrice = useMemo(
    () =>
      invoice
        ? invoice.items.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)
        : 0,
    [invoice]
  );

  const resetCheckout = () => {
    setInvoice(undefined);
    setCustomer(undefined);
    setPayMethod("tien-mat");
  };

  return {
    payMethod,
    setPayMethod,
    customer,
    setCustomer,
    ableToSubmit,
    setAbleToSubmit,
    invoice,
    setInvoice,
    newInvoiceId,
    totalInvoicePrice: +totalInvoicePrice.toFixed(1),
    resetCheckout,
  };
}

type ContextType = ReturnType<typeof useCheckout>;

const Context = createContext<ContextType | null>(null);

export default function CheckoutProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={useCheckout()}>{children}</Context.Provider>;
}

export const useCheckoutContext = () => {
  const ct = useContext(Context);
  if (!ct) throw new Error("CheckoutProvider not Provider");

  return ct;
};
