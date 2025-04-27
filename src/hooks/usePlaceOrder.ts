import { db } from "@/firebase/firebase";
import { invoiceCollectionRef, myAddDoc } from "@/firebase/firebaseService";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { useCustomerContext } from "@/stores/CustomerContext";
import { useProductContext } from "@/stores/ProductContext";
import { doc, increment, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function usePlaceOrder() {
  const [isFetching, setIsFetching] = useState(false);
  const { invoice, totalInvoicePrice, newInvoiceId, customer } =
    useCheckoutContext();
  const { shouldFetchCustomer } = useCustomerContext();
  const { shouldFetchData } = useProductContext();

  const navigater = useNavigate();

  const placeOrder = async () => {
    if (!invoice || !customer) return;

    try {
      setIsFetching(true);

      const id = await myAddDoc({
        collection: invoiceCollectionRef,
        data: invoice,
      });

      newInvoiceId.current = id;

      const batch = writeBatch(db);
      // update customer doc
      const customerRef = doc(db, "Customers", customer.id);

      batch.update(customerRef, { total_buy: increment(totalInvoicePrice) });

      if (invoice.payment === "no")
        batch.update(customerRef, { total_debt: increment(totalInvoicePrice) });

      // update product docs
      invoice.items.forEach((i) => {
        const productRef = doc(db, "Products", i.product_id);
        batch.update(productRef, { stock: increment(-i.quantity) });
      });

      // submit batch
      await batch.commit();

      shouldFetchData.current = true;
      shouldFetchCustomer.current = true;

      navigater("/finished");
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, placeOrder };
}
