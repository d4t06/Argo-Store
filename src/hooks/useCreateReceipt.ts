import { db } from "@/firebase/firebase";
import {
  customerReceiptCollectionRef,
  myAddDoc,
} from "@/firebase/firebaseService";
import { useAuth } from "@/stores/AuthContext";
import { useCustomerContext } from "@/stores/CustomerContext";
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCreateReceipt() {
  const { user } = useAuth();
  const { currentCustomerData } = useCustomerContext();

  const [isFetching, setIsFetching] = useState(false);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const addReceipt = async () => {
    try {
      if (!user || !currentCustomerData?.customer) return;
      setIsFetching(true);

      const receipt: ReceiptSchema = {
        user_email: user.email,
        customer_id: currentCustomerData.customer.id,
        price,
        created_at: serverTimestamp(),
      };

      await myAddDoc({
        collection: customerReceiptCollectionRef,
        data: receipt,
      });

      await setDoc(doc(db, currentCustomerData.customer.id), {
        total_debt: increment(-price),
      });

      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, price, addReceipt, setPrice, currentCustomerData };
}
