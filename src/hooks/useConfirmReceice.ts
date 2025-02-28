import { db } from "@/firebase/firebase";
import { myAddDoc, receiveCollectionRef } from "@/firebase/firebaseService";
import { useReceivingCartContext } from "@/stores/local/ReceivingCartContext";
import { useProductContext } from "@/stores/ProductContext";
import { doc, increment, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useConfirmReceiving() {
  const [isFetching, setIsFetching] = useState(false);
  const { receiving, resetSelect } = useReceivingCartContext();
  const { shouldFetchData } = useProductContext();

  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!receiving) return;

    console.log("run here");

    try {
      setIsFetching(true);

      await myAddDoc({
        collection: receiveCollectionRef,
        data: receiving,
      });

      const batch = writeBatch(db);

      receiving.items.forEach((i) => {
        const productRef = doc(db, "Products", i.product_id);
        batch.update(productRef, { stock: increment(i.quantity) });
      });

      await batch.commit();

      resetSelect();
      shouldFetchData.current = true;

      navigate("/menu/receive");
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, placeOrder };
}
