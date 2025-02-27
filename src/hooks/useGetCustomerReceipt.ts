import { customerReceiptCollectionRef } from "@/firebase/firebaseService";
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";

export default function useGetCustomerReceipt() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const [isFetching, setIsFetching] = useState(true);

  const getCustomerReceipts = async (id: string) => {
    try {
      const getQuery = query(
        customerReceiptCollectionRef,
        where("customer_id", "==", id),
        orderBy("created_at", "desc"),
        limit(20),
      );

      const docSnap = await getDocs(getQuery);

      if (docSnap.docs) {
        const receipts = docSnap.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id }) as Receipt,
        );

        setReceipts(receipts);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return { getCustomerReceipts, isFetching, setIsFetching, receipts };
}
